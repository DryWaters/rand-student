import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as lsUtils from '../utils/localstorageUtils';
import studentReducer from '../reducers/student';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    studentReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  store.subscribe(() => lsUtils.saveSection(store.getState()))

  return store;
};

