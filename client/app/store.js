import { createStore, compose, applyMiddleware }  from 'redux';
import rootReducer                                from './reducers/index';

const store = createStore(rootReducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
