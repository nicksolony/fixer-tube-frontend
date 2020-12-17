import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import videoReducer from './reducers/videoReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  main: videoReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;