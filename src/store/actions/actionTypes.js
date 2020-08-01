// core functionality of building that burger
// BurgerBuilder: addIngredientHandler & removeIngredientHandler are 2 main things

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

// in ContactData.js we have orderHandler() where ultimately we reach out to our BE.
// -> this is now we wanna handle in the action creator that we actually create our order in there and automatically add it to our store
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
