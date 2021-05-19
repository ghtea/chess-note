import { all, fork, takeEvery } from 'redux-saga/effects';

import appearanceSaga from './appearance';
import authSaga from './auth';
import quizSaga from './quiz';
import notificationSaga from './notification';
import statusSaga from './status';

import * as actions from 'store/actions';

export default function* rootSaga() {
  yield all([
    fork(appearanceSaga),
    fork(authSaga),
    fork(quizSaga),
    fork(notificationSaga),
    fork(statusSaga),
  ]);
  // code after fork-effect
}

// https://redux-saga.js.org/docs/advanced/RootSaga.html
