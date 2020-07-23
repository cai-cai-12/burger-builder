import React, {Component} from 'react'
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

// Let't turn it into a class component so that we can add lifecycle hooks

class OrderSummary extends Component {
    // Implement method to see when this actually updates
    componentDidUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }
    
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}$</strong></p>
                <p>Do you wanna continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux> 
        );
    }
}

export default OrderSummary;