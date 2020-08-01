import React, {Component} from 'react';
// let connect the BurgerBuilder to our 'store'
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// withErrorHandler with a lowercase because we're not going to use it in JSX
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        // ingredients: null, (remove ingredients & totalPrice from here because we're not using the local state anymore)
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        // When loading = true -> show the spinner, when loading = false -> show the OrderSummary
        loading: false,
        // error: false,
    }

    componentDidMount() {
        console.log(this.props);
        // axios.get('https://react-my-burger-fa20a.firebaseio.com/ingredients.json')
        //     .then(Response => {
        //         this.setState({ingredients: Response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    // redux
    // use all these props we make available in the BurgerBuilder (like ings, price, onIngedientAdded, onIngedientRemoved)
    // use this.props.ings instead of this.state.ingredients
    // addIngredientHandler -> onIngedientAdded, removeIngredientHandler -> onIngedientRemoved
    render () {
        // before we return JSX, we'll create a new const to create a new obj where we'll distribute the props of this.state      
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        // add a check if this.state.loading
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

// holds a func which receives the 'state' automatically
// and which returns a JS obj where we define which property should hold which slice of the state.
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error,
    };
};

// receives a func or holds a func which receives the 'dispatch' func as an argument
// and then returns the obj with props func mapping 
// we have to dispatchable props (or 2 props which can be triggered: onIngedientAdded & onIngedientRemoved)
const mapDispatchToProps = dispatch => {
    return {
        // will hold an anonymous func where execute dispatch & pass a JS obj
        // have a look at the reducer and remember, we used the 'ingedientName' and access it on the action
        // so we need to pass the 'ingedientName' along with the type
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    };
};

// in this setup now, we have our BurgerBuilder container connected to the store
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));