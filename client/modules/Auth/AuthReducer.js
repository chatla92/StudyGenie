import {
  SIGNIN_SUCCESSFUL,
  SIGNIN_FAILURE,
  REGISTER_SUCCESSFUL,
  REGISTER_FAILURE,
  REQUEST_PASSWORD_SUCCESSFUL,
  REQUEST_PASSWORD_FAILURE,
} from './AuthConstants';

// Initial State
const initialState = {
  username: '',
  sessionId: '',
  fullname: '',
  currView: 'signin',
  auth_status: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESSFUL :
      return {
        username: action.user,
      };

    case SIGNIN_FAILURE :
      return {
        username: '',
        sessionId: '',
        fullname: '',
        auth_status: action.err,
      };

    case REGISTER_SUCCESSFUL :
      return {
        auth_status: '',
      };

    case REGISTER_FAILURE :
      return {
        auth_status: action.err,
      };
    case REQUEST_PASSWORD_SUCCESSFUL :
      return {
        username: action.user,
      };

    case REQUEST_PASSWORD_FAILURE :
      return {
        auth_status: action.err,
      };

    default:
      return state;
  }
};

export default authReducer;
