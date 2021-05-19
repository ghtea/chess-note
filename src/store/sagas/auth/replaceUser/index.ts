import { call, spawn, put, takeEvery } from 'redux-saga/effects';
import history from 'libraries/history';

import axios from 'axios';
import queryString from 'query-string';
import { firebaseAuth } from 'libraries/firebase';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';

import * as actions from 'store/actions';

//import * as actionsTheme from "../../actions/theme";

function* replaceUser(action: actions.auth.type__REPLACE_USER) {
  try {
    const user = firebaseAuth.currentUser;

    if (user) {
      yield put(
        actions.auth.return__REPLACE({
          keyList: ['user'],
          replacement: {
            id: user.uid,
            email: user.email,

            photoURL: user.photoURL,
            name: user.displayName,

            joined: user.metadata.creationTime,
            accessed: user.metadata.lastSignInTime,
          },
        }),
      );
    } else {
      yield put(
        actions.auth.return__REPLACE({
          keyList: ['user'],
          replacement: null,
        }),
      );
      //console.log('no user');
    }
  } catch (error) {
    console.error(error);
    console.error('replaceUser has been failed');

    yield put(
      actions.auth.return__REPLACE({
        keyList: ['user'],
        replacement: null,
      }),
    );

    yield put(
      actions.notification.return__ADD_CODE_SITUATION_OTHERS({
        codeSituation: 'UnknownError__E',
      }),
    );
  }
}

export default replaceUser;
