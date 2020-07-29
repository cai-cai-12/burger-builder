import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
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
            return {
                // first of all, we'll copy the entire old state with the ...operator
                ...state,
                ingredients: {
                    ...state.ingredients,
                    // in this new ingredients obj, we want to overwrite the given ingredient which we need to get as a payload of this action
                    // in ES6, we can use the special syntax [] to dinamically overwrite a property in a given JS obj
                    // this doesn't create an arr here. Instead, we can pass a variable over a something which contains the name we want to use as a property name
                    // ingredientName is something we get as payload to the action
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]

            // we don't need break statements because we return in each case anyways,
            // so the code execution won't continue in this func.
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;




