import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

// Store specifically has the thunk and logger middleware applied
const store = () => configureStore({ reducer: rootReducer });

export default store();
