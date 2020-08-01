// order.js should hold the action creators for submitting an order
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// expect to get the id of the newly created order which was created on the BE's DB
// because we want to pass it to the action which create in the reducer
// so we can use that action to add the order to our orders arr
// These are the 2 synchronous action creators
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

// The async 1 - this is the action we dispatched from the container we click that order btn
// Here we do expect to get some oderData (like the user data, addIndredient...)
export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.push('/orders.json', orderData)
            .then(Response => {
                console.log(Response.data);
                dispatch(purchaseBurgerSuccess(Response.data, orderData));
            })
            .catch(eror => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

