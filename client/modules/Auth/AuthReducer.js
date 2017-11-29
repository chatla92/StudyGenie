import {
  SIGNIN_SUCCESSFUL,
  SIGNIN_FAILURE,
  REGISTER_SUCCESSFUL,
  REGISTER_FAILURE,
  REQUEST_PASSWORD_SUCCESSFUL,
  REQUEST_PASSWORD_FAILURE,
  VIEW_TYPE,
  AUTH_STAT,
  LOGOUT,
} from './AuthConstants';

// Initial State
const initialState = {
  username: '',
  fullname: '',
  auth_status: AUTH_STAT.UNAUTHENTICATED,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESSFUL :
      return {
        username: action.payload.username,
        fullname: action.payload.fullname,
        auth_status: AUTH_STAT.AUTHENTICATED,
      };

    case SIGNIN_FAILURE :
      return {
        username: '',
        fullname: '',
        auth_status: AUTH_STAT.LOGIN_FAILURE,
      };

    case REGISTER_SUCCESSFUL :
      return {
        auth_status: AUTH_STAT.REGISTER_SUCCESSFUL,
      };

    case REGISTER_FAILURE :
      const {status} = action.payload;
      let auth_status = AUTH_STAT.REGISTER_FAILURE
      if(status === 409) {
        auth_status = AUTH_STAT.EMAIL_TAKEN
      }
      return {
        auth_status,
      };
    case REQUEST_PASSWORD_SUCCESSFUL :
      return {
        auth_status: AUTH_STAT.PASSWORD_REQUESTED,
      };

    case REQUEST_PASSWORD_FAILURE :
      return {
        auth_status: AUTH_STAT.PASSWORD_REQUEST_FAILED,
      };
    case LOGOUT :
      return {
        username: '',
        fullname: '',
        auth_status: AUTH_STAT.UNAUTHENTICATED,
      };

    default:
      return state;
  }
};

export default authReducer;
