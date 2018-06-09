import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  // reducers
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

const middleware = [thunk];

export default createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
