import { call, spawn, put, takeEvery } from 'redux-saga/effects';
import history from 'libraries/history';

import axios from 'axios';
import queryString from 'query-string';

import firebaseApp, { firebaseAuth } from 'libraries/firebase';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';

import * as actions from 'store/actions';
import applyLoggedInUser from '../logIn/applyLoggedInUser';
import applyLoggedOutUser from '../logOut/applyLoggedOutUser';

//import * as actionsTheme from "../../actions/theme";

const requestSignUp = (email: string, password: string) => {
  return firebaseAuth.createUserWithEmailAndPassword(email, password);
};

function* signUp(action: actions.auth.type__SIGN_UP) {
  try {
    yield put(
      actions.notification.return__REPLACE({
        keyList: ['otherSituationCodeList'],
        replacement: [],
      }),
    );

    if (action.payload.email === '') {
      console.log('type email address');
      yield put(
        actions.notification.return__ADD_CODE_SITUATION_OTHERS({
          situationCode: 'SignUp_NoEmail__E',
        }),
      );
      //addDeleteNotification("auth01", language);
    } else if (action.payload.password1 === '' || action.payload.password2 === '') {
      /*
        else if ( !(/\S+@\S+\.\S+/).test(action.payload.email) ){
            console.log('type valid email address');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                situationCode: 'SignUp_NotValidEmail'
            }) );
            //addDeleteNotification("auth021", language);
        }
        */
      console.log('type both passwords');
      yield put(
        actions.notification.return__ADD_CODE_SITUATION_OTHERS({
          situationCode: 'SignUp_NoPassword__E',
        }),
      );
      //addDeleteNotification("auth03", language);
    } else if (action.payload.password1 !== action.payload.password2) {
      console.log('two passwords are different');
      yield put(
        actions.notification.return__ADD_CODE_SITUATION_OTHERS({
          situationCode: 'SignUp_PasswordsDifferent__E',
        }),
      );
      //addDeleteNotification("auth04", language);
    } else {
      /*
        else if (action.payload.password1.length < 6) {
            console.log('password is too short');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                situationCode: 'SignUp_ShortPassword'
            }) );
            //addDeleteNotification("auth04", language);
        }
        */
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

      const email: string = action.payload.email;
      const password: string = action.payload.password1;

      try {
        yield call(requestSignUp, email, password);
        yield applyLoggedInUser();

        yield put(
          actions.notification.return__ADD_DELETE_BANNER({
            situationCode: 'SignUp_Succeeded__S',
          }),
        );
      } catch (error) {
        throw error;
      }
    } // higher else
  } catch (error) {
    yield applyLoggedOutUser();

    if (error.code === 'auth/email-already-in-use') {
      console.error(error.message);
      yield put(
        actions.notification.return__ADD_CODE_SITUATION_OTHERS({
          situationCode: 'SignUp_DuplicateEmail__E',
        }),
      );
    } else if (error.code === 'auth/invalid-email') {
      console.error(error.message);
      yield put(
        actions.notification.return__ADD_CODE_SITUATION_OTHERS({
          situationCode: 'SignUp_InvalidEmail__E',
        }),
      );
    } else if (error.code === 'auth/weak-password') {
      console.error(error.message);
      yield put(
        actions.notification.return__ADD_CODE_SITUATION_OTHERS({
          situationCode: 'SignUp_WeakPassword__E',
        }),
      );
    } else if (error.code === 'auth/operation-not-allowed') {
      console.error(error.message);
      yield put(
        actions.notification.return__ADD_DELETE_BANNER({
          situationCode: 'SignUp_UnknownError__E',
        }),
      );
    } else {
      console.error(error);
      yield put(
        actions.notification.return__ADD_DELETE_BANNER({
          situationCode: 'SignUp_UnknownError__E',
        }),
      );
    }

    console.error('signUp has been failed');
  }
}

export default signUp;
