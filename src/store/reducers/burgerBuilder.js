// hold code relevant to building the burger only
import * as actionTypes from '../actions/actionTypes';

// now we can "updateObject" whenever we have code like this, where we distribute some props.
import {updateObject} from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

// state = initialState -> get undefined as a state which we do in the 1st time this runs
// action -> the action which will receive
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            // return {
            //     // first of all, we'll copy the entire old state with the ...operator
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         // in this new ingredients obj, we want to overwrite the given ingredient which we need to get as a payload of this action
            //         // in ES6, we can use the special syntax [] to dinamically overwrite a property in a given JS obj
            //         // this doesn't create an arr here. Instead, we can pass a variable over a something which contains the name we want to use as a property name
            //         // ingredientName is something we get as payload to the action
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //     },
            //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]

            // // we don't need break statements because we return in each case anyways,
            // // so the code execution won't continue in this func.
            // };
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState);

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngs = (state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedSt);

        case actionTypes.SET_INGREDIENTS:
            // return {
            //     ...state,
            //     ingredients: {
            //         // since we loaded from firebase and we can't order the props manually
            //         // (the salad is ordered at the bottom alphabetically...)
            //         // -> simply choose a solution where to hardcode our ingredients
            //         salad: action.ingredients.salad,
            //         bacon: action.ingredients.bacon,
            //         cheese: action.ingredients.cheese,
            //         meat: action.ingredients.meat,
            //     },
            //     //to resetting the Price after Purchases
            //     totalPrice: 4,
            //     // one important thing, when we call SET_INGREDIENTS here, we will set the error to false to reset it
            //     error: false,
            // };
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,                    
                },
                totalPrice: 4,
                error: false,
            });

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            // return {
            //     ...state,
            //     error: true
            // };
            return updateObject(state, {error: true});

        default:
            return state;
    }
};

export default reducer;


