// if we clicked the Order btn. We need to handle that loading state in our redux store
// we worked on the action creators for orders and worked on being able to dispatch them
// now we need to manage the order state through our reducer

import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    orders: [],
    // want to know if we are in process of ordering (or if we are done)
    // it should be set to true when we then start ordering
    loading: false, 
    purchased: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false});
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {id: action.orderID});
            return updateObject(state, {
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder),
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {loading: false});
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false,
            });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {loading: false});
        default:
            return state;
    }
};

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.PURCHASE_INIT:
//             return {
//                 ...state,
//                 purchased: false,
//             };
//         case actionTypes.PURCHASE_BURGER_START:
//             return {
//                 ...state,
//                 loading: true,    
//             };
//         case actionTypes.PURCHASE_BURGER_SUCCESS:
//             const newOrder = {
//                 ...action.orderData,
//                 id: action.orderID,
//             };
//             return {
//                 ...state,
//                 loading: false,
//                 purchased: true,
//                 orders: state.orders.concat(newOrder),
//             };
//         case actionTypes.PURCHASE_BURGER_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//             };
//         case actionTypes.FETCH_ORDERS_START:
//             return {
//                 ...state,
//                 loading: true,
//             }
//         case actionTypes.FETCH_ORDERS_SUCCESS:
//             return {
//                 // to store the orders we fetched
//                 ...state,
//                 orders: action.orders,
//                 loading: false,
//             }
//         case actionTypes.FETCH_ORDERS_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//             };     
//         default:
//             return state;
//     }
// };

export default reducer;