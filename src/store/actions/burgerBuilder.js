// to create the action creators for building a burder
// we'll only have synchronous action creators for adding & removing ingredients
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    };
};

// return an action we want to dispatch
// that is the action we eventually want to dispatch once the async code in 'initIngedients' is done
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

// Let's Fetch Ingredients Asynchronously (fetch the async code we want to execute)
// execute async code and dispatch a new action whenever we're done
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-fa20a.firebaseio.com/ingredients.json')
            .then(Response => {
                dispatch(setIngredients(Response.data));
            })
            .catch(error => {
                // make sure that we connect our BurgerBuilder correctly to these new things like the error state
                dispatch(fetchIngredientsFailed());
            });
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};