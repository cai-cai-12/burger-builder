import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        // simply go back to the last page
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
            {/* Keep in mind, CheckoutSummary expects to get ingredients as a props
                So we should pass ingredients here
                But where do we get our ingredients from? */}
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    // component={ContactData}
                    // we can output some JSX on the right side of the arrow with the same result
                    // However since we now render it manually here, we can pass props to it

                    // we only really need it where we use our little trick for loading the ContactData
                    // render={(props) => <ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>}
                    
                    // with redux store, we no longer need to use the trick
                    // and instead just set a component we want to load
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        // price: state.totalPrice -> we don't actually even need the price here, because we don't use it anywhere else in this component
    }
};

// we don't need mapDispatchToProps here
// because we're not actually dispatching anything in this container (we just navigave)

export default connect(mapStateToProps)(Checkout);