import { all, fork, takeEvery } from 'redux-saga/effects'

import sagaAppearance from './sagas/appearance';
import sagaAuth from './sagas/auth';
import sagaData from './sagas/data';
import sagaNotification from './sagas/notification';
import sagaStatus from './sagas/status';
import sagaPresent from './sagas/present';

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