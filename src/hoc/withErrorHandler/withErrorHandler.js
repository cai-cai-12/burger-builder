import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

// It's also an improvement to the UX if we show error msg in case something fails
// there are different places to where you could show such an error msg,
// I simply want to set up some global error handler which shows a modal with the error message but doesn't use the modal here because I don't want to be stuck to this container, to the burger builder container.
// I want to have a flexible way of showing an error, no matter which component, in which container it occurs, so therefore my modal is going to get added to a higher level in the app and I want to have
// a higher level of the application, so some higher component than this burger builder container where I catch errors and where I then make sure that my error modal is displayed.
// Now where can we set this up, how can we control this?
// I simply want to create a higher order component with which I can wrap the burger builder or which I'll
// actually use in that second way I showed you for using higher order components so that we can simply wrap any component which should have this error modal with it and can conveniently add the error handling functionality to it.


const withErrorHandler = (WrappedComponent, axios) => {
    // Don't set up a name here because we never use that class (anonymous class)
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // not really interested in the request but want to call this.setState to clear any errs
                // so that whenever we send a req, we don't have err set up anymore
                this.setState({error: null});
                // we have to return the request config
                // so the request can continue & for the response 
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            console.log('Will Unmount', this.resInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    {/* We only want to show this msg if we got an err, 
                    so we need to set 'show' to sth else that needs to come from the wrappedComponent (we need that info if it failed).
                    To get that info, we should add a 2nd arg to our higher orfer func
                    (ex: axios - because the axios instance which was used so that we can set up an err handler - a global handler on it)*/}
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler} >
                            {/* Something didn't work! */}
                            {/* this.state.error.message will throw an err initially because Modal component is always present even if we don't show it there
                            => add a ternary expression */}
                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
};

export default withErrorHandler;