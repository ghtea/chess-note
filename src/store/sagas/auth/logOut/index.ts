import { call, spawn, put, takeEvery } from 'redux-saga/effects';
import history from 'libraries/history';

import { firebaseAuth } from 'libraries/firebase';

import Cookies from 'js-cookie';

// import * as config from 'config';

import * as actions from 'store/actions';
import applyLoggedOutUser from './applyLoggedOutUser';

//import * as actionsTheme from "../../actions/theme";

function* logOut(action: actions.auth.type__LOG_OUT) {
  yield call(() => firebaseAuth.signOut());

  yield applyLoggedOutUser();

  window.location.reload();
}

export default logOut;
