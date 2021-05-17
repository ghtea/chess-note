import { all, fork, takeEvery } from 'redux-saga/effects'

import sagaAppearance from './appearance';
import sagaAuth from './auth';
import sagaData from './data';
import sagaNotification from './notification';
import sagaStatus from './status';
import sagaPresent from './present';

import * as actions from 'store/actions';

export default function* sagaRoot() {
  yield all ([
    fork(sagaAppearance),
    fork(sagaAuth),
    fork(sagaData),
    fork(sagaNotification),
    fork(sagaStatus),
    fork(sagaPresent),
])
  // code after fork-effect
}

// https://redux-saga.js.org/docs/advanced/RootSaga.html