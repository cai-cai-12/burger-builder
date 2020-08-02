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
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';

// redirected once we placed an order
// PURCHASE_INIT will be dispatched whenever we load the Checkout page
export const PURCHASE_INIT = 'PURCHASE_INIT';

// 17. Fetching Orders (via Redux)
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';