import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/user';
import apiCallReducer from './slices/apiCall';

export default combineReducers({
  user: userReducer,
  apiCall: apiCallReducer,
});
