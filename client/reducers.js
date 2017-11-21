/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers

import notebook from './modules/Note/NoteReducer';
import intl from './modules/Intl/IntlReducer';
import auth from './modules/Auth/AuthReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  notebook,
  intl,
  auth,
});
