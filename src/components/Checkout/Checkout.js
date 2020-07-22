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

    render() {
        return(
            <div>
            {/* Keep in mind, CheckoutSummary expects to get ingredients as a props
                So we should pass ingredients here
                But where do we get our ingredients from? */}
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;