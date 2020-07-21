import React, {Component} from 'react';
import classes from './Modal.css';

// The creator will add the backdrop to the modal because this backdrop is closely connected to the modal
// If the modal is shown, the backdrop shoud be shown
import Backdrop from '../Backdrop/Backdrop';

// So therefore, the creator will import auxilary component here because we need to place that modal next to the backdrop
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     // want to make sure that this only updates if 'show' changes
    //     if (nextProps.show !== this.props.show) {
    //         return true;
    //     }
    // }

    // when clicked 'Continue' button, we did'nt see the Spinner
    // we're correctly setting 'loading' props but somehow our Modal doesn't update
    // The reason is we use shouldComponentUpdate() here and we basically only update the component if the state.show changed
    // the children of the components simply change to props
    // But we're passing a new child & passing the Spinner instead of the OrderSummary
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
    }

    // implement componentWillUpdate() here to confirm if this works
    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>            
        );
    }
}

export default Modal;