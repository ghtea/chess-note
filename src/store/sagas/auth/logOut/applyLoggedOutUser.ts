import { call, spawn, put, takeEvery } from 'redux-saga/effects';
import history from 'libraries/history';
import * as actions from 'store/actions';

export default function* applyLoggedOutUser() {
  yield put(
    actions.status.return__REPLACE({
      keyList: ['auth', 'user'],
      replacement: {
        tried: true,
        loading: false,
        ready: false,
      },
    }),
  );

  yield put(actions.auth.return__REPLACE_USER());
  
}
