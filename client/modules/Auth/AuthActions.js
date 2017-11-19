import callApi from '../../util/apiCaller';
import { createAction } from 'redux-actions';
import {
  SIGNIN_SUCCESSFUL,
  SIGNIN_FAILURE,
  REGISTER_SUCCESSFUL,
  REGISTER_FAILURE,
  REQUEST_PASSWORD_SUCCESSFUL,
  REQUEST_PASSWORD_FAILURE,
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

// Export Actions
export function signin(username, password) {
  return (dispatch) => {
    return callApi('login', 'post', {
      username,
      password,
    }).then((err, res) => {
      if (err) {
        dispatch(signinFailure(err));
      } else {
        dispatch(signinSuccessful(res.user));
      }
    });
  };
}

export function register(username, fullname, password) {
  return (dispatch) => {
    return callApi('register', 'post', {
      username,
      password,
    }).then((err, res) => {
      if (err) {
        dispatch(registerFailure(err));
      } else {
        dispatch(registerSuccessful(res.status));
      }
    });
  };
}

export function requestPassword(username, fullname, password) {
  return (dispatch) => {
    return callApi('register', 'post', {
      username,
      password,
    }).then((err, res) => {
      if (err) {
        dispatch(requestPasswordFailure(err));
      } else {
        dispatch(requestPasswordSuccessful(res.status));
      }
    });
  };
}

export const authActions = {
  signin,
  register,
  requestPassword,
};
