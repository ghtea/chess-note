import { call, spawn, put, takeEvery } from 'redux-saga/effects';
import history from 'libraries/history';

import { firebaseAuth } from 'libraries/firebase';

import Cookies from 'js-cookie';

// import * as config from 'config';

import * as actions from 'store/actions';

//import * as actionsTheme from "../../actions/theme";

function* logOut(action: actions.auth.type__LOG_OUT) {
  firebaseAuth.signOut();

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

  window.location.reload();
  //window.location.href = window.location.href;
}

export default logOut;
