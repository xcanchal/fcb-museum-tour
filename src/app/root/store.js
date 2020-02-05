import { createStore } from 'redux';
import rootReducer from './reducers';

/* eslint-disable */
export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    initialState,
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(rootReducer, () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
/* eslint-enable */
