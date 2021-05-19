import createSagaMiddleware, { END } from 'redux-saga';
import history from 'libraries/history';

import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware({
  context: {
    history: history,
  },
});

// type State = ReturnType<typeof rootReducer>;

// example: dont show logger when testing
let listMiddleware = [];
if (process.env.NODE_ENV === 'production') {
  listMiddleware = [sagaMiddleware];
} else {
  listMiddleware = [sagaMiddleware, logger];
}

const store = createStore(rootReducer, applyMiddleware(...listMiddleware));

sagaMiddleware.run(rootSaga);

export default store;

// redux-logger:   https://github.com/LogRocket/redux-logger
// old:   https://kamang-it.tistory.com/entry/React13reduxsaga%EB%A1%9C-%EB%B9%84%EB%8F%99%EA%B8%B0-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
// https://redux-saga.js.org/
