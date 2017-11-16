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
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESSFUL :
      return {
        data: action.posts,
      };

    case SIGNIN_FAILURE :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    case REGISTER_SUCCESSFUL :
      return {
        data: action.posts,
      };

    case REGISTER_FAILURE :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };
    case REQUEST_PASSWORD_SUCCESSFUL :
      return {
        data: action.posts,
      };

    case REQUEST_PASSWORD_FAILURE :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

export default authReducer;
