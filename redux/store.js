import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './reducers/counter';


const rootReducer = combineReducers({
  counter: counterReducer,
});


const store = configureStore({
  reducer: rootReducer,
});

export default store;