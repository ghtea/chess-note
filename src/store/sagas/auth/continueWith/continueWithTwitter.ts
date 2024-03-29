import { call, spawn, put, takeEvery } from 'redux-saga/effects';
import history from 'libraries/history';

import axios from 'axios';
import queryString from 'query-string';
import firebase, { firebaseAuth } from 'libraries/firebase';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';

import * as actions from 'store/actions';
import applyLoggedInUser from '../logIn/applyLoggedInUser';

//import * as actionsTheme from "../../actions/theme";

const requestLogInTwitter = (provider: firebase.auth.AuthProvider) => {
  return firebaseAuth.signInWithPopup(provider);
};

function* logInTwitter(action: actions.auth.type__CONTINUE_WITH_TWITTER) {
  try {
    const provider = new firebase.auth.TwitterAuthProvider();
    //provider = new firebaseApp.auth.GithubAuthProvider();

    yield put(
      actions.notification.return__REPLACE({
        keyList: ['otherSituationCodeList'],
        replacement: [],
      }),
    );

    yield put(
      actions.status.return__REPLACE({
        keyList: ['auth', 'user'],
        replacement: {
          tried: false,
          loading: true,
          ready: false,
        },
      }),
    );

    try {
      yield call(requestLogInTwitter, provider);
      yield applyLoggedInUser();
    } catch (error) {
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

      console.error(error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        console.error(error.message);
        yield put(
          actions.notification.return__ADD_DELETE_BANNER({
            situationCode: 'LogIn_UnknownError__E',
          }),
        );
      } else {
        console.error(error);
        yield put(
          actions.notification.return__ADD_DELETE_BANNER({
            situationCode: 'LogIn_UnknownError__E',
          }),
        );
      }
    }

    // go to home
  } catch (error) {
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

    console.error(error);
    console.error('logInTwitter has been failed');

    yield put(
      actions.notification.return__ADD_CODE_SITUATION_OTHERS({
        situationCode: 'LogIn_UnknownError__E',
      }),
    );
  }
}

export default logInTwitter;
