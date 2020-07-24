import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // we'll symply pass a dummy ingredients obj
    state = {
        ingredients: null,
        price: 0
    }

    // implement the logic to pass the real ingredients we picked on the checkout container
    // won't use componentDidUpdate() or anything like that
    // because whenever we load this component, it'll mount itself.
    // there is no way we can route to it without it being mounted again because it's not nested in some other page or anything like that.
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
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
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    // component={ContactData}
                    // we can output some JSX on the right side of the arrow with the same result
                    // However since we now render it manually here, we can pass props to it
                    render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}
                    />
            </div>
        );
    }
}

export default Checkout;