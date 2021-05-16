import { call, spawn, put, takeEvery } from 'redux-saga/effects';
import { firebaseAuth } from 'libraries/firebase';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

//import * as config from 'config';
import * as actions from 'store/actions';

type Action = actions.auth.type__LOG_CHECK_FAILED;

function* logCheckFailed(action: actions.auth.type__LOG_CHECK_FAILED) {
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
  // yield put( actions.auth.return__REPLACE_USER({
  //     user: null
  // }) );

  yield put(
    actions.notification.return__ADD_CODE_SITUATION_OTHERS({
      codeSituation: 'LogCheck_UnknownError__E',
    }),
  );
  console.log('log check failed');
}

export default logCheckFailed;
