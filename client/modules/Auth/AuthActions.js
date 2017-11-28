import callApi from '../../util/apiCaller';
import { createAction } from 'redux-actions';
import {
  SIGNIN_SUCCESSFUL,
  SIGNIN_FAILURE,
  REGISTER_SUCCESSFUL,
  REGISTER_FAILURE,
  REQUEST_PASSWORD_SUCCESSFUL,
  REQUEST_PASSWORD_FAILURE,
  LOGOUT,
} from './AuthConstants';


export const signinSuccessful = createAction(
  SIGNIN_SUCCESSFUL,
  creds => creds,
);

export const signinFailure = createAction(
  SIGNIN_FAILURE,
  err => err,
);

export const registerSuccessful = createAction(
  REGISTER_SUCCESSFUL,
  creds => creds,
);
export const registerFailure = createAction(
  REGISTER_FAILURE,
  err => err,
);

export const requestPasswordSuccessful = createAction(
  REQUEST_PASSWORD_SUCCESSFUL,
  creds => creds,
);

export const requestPasswordFailure = createAction(
  REQUEST_PASSWORD_FAILURE,
  err => err,
);

export const logout = createAction(
  LOGOUT,
);

export function signout() {
  return (dispatch) => {
    return callApi('/logout').then((err, res) => {
      dispatch(logout());
    });
  };
}

// Export Actions
export function signin(username, password) {
  return (dispatch) => {
    return callApi('auth/', 'post', {
      username,
      password,
    }).then(response => {
      localStorage.setItem('fullname', response.result.fullname);
      localStorage.setItem('username', response.result.username);
      dispatch(signinSuccessful(response.result));
    }, err => {
      dispatch(signinFailure(err));
    });
  };
}

export function register(username, fullname, password) {
  return (dispatch) => {
    return callApi('auth/addUser', 'post', {
      username,
      password,
      fullname,
    }).then(response => {
      dispatch(registerSuccessful(response.result));
    }, err => {
      dispatch(registerFailure(err));
    });
  };
}

export function requestPassword(username, fullname, password) {
  return (dispatch) => {
    return callApi('/auth/requestPassword', 'post', {
      username,
      password,
    }).then(response => {
      dispatch(requestPasswordSuccessful(response.result));
    }, err => {
      dispatch(requestPasswordFailure(err));
    });
  };
}

const authActions = {
  signin,
  register,
  requestPassword,
  signout,
};

export default authActions;
