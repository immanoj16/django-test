import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './authReducer';
import expenseReducer from './expenseReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

const middleware = [thunk];

export default createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
