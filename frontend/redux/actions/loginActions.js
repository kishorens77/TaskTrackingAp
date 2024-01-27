import { loginUser } from "../service/LoginService";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const login = (loginData) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        // try {
        //     //   const userData = await loginUser(loginData).then(); 
        //     //   dispatch(loginSuccess(userData));
        //     // const userData = 
        //     loginUser(loginData).then(res => dispatch(loginSuccess(res)));

        // } catch (error) {
        //     dispatch(loginFailure(error));
        // }

        loginUser(loginData)
            .then(res => dispatch(loginSuccess(res)))
            .catch(e => {
                dispatch(loginFailure(e.message));
            });

    };
};
