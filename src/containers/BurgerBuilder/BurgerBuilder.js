import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// withErrorHandler with a lowercase because we're not going to use it in JSX
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        // When loading = true -> show the spinner, when loading = false -> show the OrderSummary
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-fa20a.firebaseio.com/ingredients.json')
            .then(Response => {
                this.setState({ingredients: Response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!!!');

        // call this.setState and set loading to true, 
        // because we're loading the request is about to get sent.
        // Once the "Response => console.log(Response)" though
        this.setState({loading: true});

        // use axios instance to send the request to our backend
        // for storing data, we should use a post request and therefore we use the post() method on that instance
        // now we also need to send some data and that data should be our order for the given burger config.
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Hai Trieu',
                address: {
                    street: 'Dinh Tien Hoang',
                    zipCode: '70000',
                    country: 'Viet Nam'
                },
                email: 'trieungochai.dev@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(Response => {
                // want to stop loading no matter what the response is 
                // because the request is done even if it failed.
                
                // set the loading to false again -> go back to the 'order'
                this.setState({loading: false, purchasing: false});

            })
            .catch(error => {
                // want to set loading to false if we have an err
                // because even if an err occurred, we want to stop loading
                // and we don't want to show the spinner anymore 
                // because our UI would be stuck in this case and the user would think it's still loading
                // => close the Modal 
                // because the modal only shown if state.purchasing props = true -> so in both cases, we'll set purchasing = false
                this.setState({loading: false, purchasing: false})
            });
    }

    render () {
        // before we return JSX, we'll create a new const to create a new obj where we'll distribute the props of this.state
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        // add a check if this.state.loading
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (   
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {/* <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    /> */}
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);