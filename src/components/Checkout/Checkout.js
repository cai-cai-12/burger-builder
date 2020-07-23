import React, {Component} from 'react';

import CheckoutSummary from '../Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    // we'll symply pass a dummy ingredients obj
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        }
    }

    // implement the logic to pass the real ingredients we picked on the checkout container
    // won't use componentDidUpdate() or anything like that
    // because whenever we load this component, it'll mount itself.
    // there is no way we can route to it without it being mounted again because it's not nested in some other page or anything like that.
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

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
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler} />
            </div>
        );
    }
}

export default Checkout;