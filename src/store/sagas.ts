import { all, fork, takeEvery } from 'redux-saga/effects'

import sagaStatus from './sagas/status';
import sagaNotification from './sagas/notification';
import sagaAuth from './sagas/auth';
import sagaData from './sagas/data';


import * as actions from 'store/actions';

export default function* sagaRoot() {
  yield all ([
    fork(sagaNotification),
    fork(sagaAuth),
    fork(sagaStatus),
    fork(sagaData),
])
  // code after fork-effect
}

// https://redux-saga.js.org/docs/advanced/RootSaga.html