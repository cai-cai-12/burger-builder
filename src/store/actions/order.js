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
// But this has async code and therefore doesn't return an action -> so we'll add a new action creator (purchaseBurgerStart)
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(Response => {
                console.log(Response.data);
                dispatch(purchaseBurgerSuccess(Response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

// 17. Fetching Orders (via Redux)
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

// as for purchasing, we need the const where we run our async code
export const fetchOrders = () => {
    return dispatch => {
        axios.get('/orders.json')
            .then(Response => {
                const fetchedOrder = [];
                for (let key in Response.data) {
                    fetchedOrder.push({
                        ...Response.data[key],
                        id: key,
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrder));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    };
};
