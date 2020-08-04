import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };      
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

// this action type will be the one holding a aynsc code doing the authentication
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,  
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAS1yFfjEmXSVhwOWGediH1EGQzV_VYgDw';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAS1yFfjEmXSVhwOWGediH1EGQzV_VYgDw';
        }

        axios.post(url, authData)
            .then(Response => {
                console.log(Response);
                dispatch(authSuccess(Response.data.idToken, Response.data.localId));
                dispatch(checkAuthTimeout(Response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.Response.data.error));
            });
    };
};