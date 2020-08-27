import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        // authenticate user
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureTokeN: true
        }

        let key = process.env.REACT_APP_FIREBASE_KEY;

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

        if (!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
        }

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err));
        })
    };
}