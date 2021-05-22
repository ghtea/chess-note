import { call, spawn, put, takeEvery } from 'redux-saga/effects';
import history from 'libraries/history';

import { firebaseAuth } from 'libraries/firebase';

import * as actions from 'store/actions';
import applyLoggedInUser from './applyLoggedInUser';

const requestLogIn = (email: string, password: string) => {
  return firebaseAuth.signInWithEmailAndPassword(email, password);
};

function* logIn(action: actions.auth.type__LOG_IN) {
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
          situationCode: 'LogIn_NoEmail__E',
        }),
      );
    } else if (action.payload.password === '') {
      console.log('type password');
      yield put(
        actions.notification.return__ADD_CODE_SITUATION_OTHERS({
          situationCode: 'LogIn_NoPassword__E',
        }),
      );
    } else {
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
      const password: string = action.payload.password;

      try {
        yield call(requestLogIn, email, password);

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
        if (error.code === 'auth/wrong-password') {
          console.error(error.message);
          yield put(
            actions.notification.return__ADD_CODE_SITUATION_OTHERS({
              situationCode: 'LogIn_WrongPassword__E',
            }),
          );
        } else if (error.code === 'auth/invalid-email') {
          console.error(error.message);
          yield put(
            actions.notification.return__ADD_CODE_SITUATION_OTHERS({
              situationCode: 'LogIn_InvalidEmail__E',
            }),
          );
        } else if (error.code === 'auth/user-disabled') {
          console.error(error.message);
          yield put(
            actions.notification.return__ADD_DELETE_BANNER({
              situationCode: 'LogIn_UserDisabled__E',
            }),
          );
        } else if (error.code === 'auth/user-not-found') {
          console.error(error.message);
          yield put(
            actions.notification.return__ADD_DELETE_BANNER({
              situationCode: 'LogIn_UserNotFound__E',
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
    } // higher else

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

    yield put(
      actions.notification.return__ADD_CODE_SITUATION_OTHERS({
        situationCode: 'LogIn_UnknownError__E',
      }),
    );
  }
}

export default logIn;
