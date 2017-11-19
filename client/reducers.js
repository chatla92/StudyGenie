/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers

import posts from './modules/Note/NoteReducer';
import intl from './modules/Intl/IntlReducer';
import authReducer from './modules/Auth/AuthReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  posts,
  intl,
  auth: authReducer,
});
