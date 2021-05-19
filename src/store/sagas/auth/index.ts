import { call, spawn, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
//import * as config from '../../config';
import replaceUser from 'store/sagas/auth/replaceUser';

import signUp from 'store/sagas/auth/signUp';
import logIn from 'store/sagas/auth/logIn';
import logOut from 'store/sagas/auth/logOut';

import logInGoogle from 'store/sagas/auth/continueWith/continueWithGoogle';
import logInTwitter from 'store/sagas/auth/continueWith/continueWithTwitter';
import logInGithub from 'store/sagas/auth/continueWith/continueWithGithub';

import logCheckSucceeded from 'store/sagas/auth/logCheck/logCheckSucceeded';
import logCheckFailed from 'store/sagas/auth/logCheck/logCheckFailed';

import updateProfile from 'store/sagas/auth/updateProfile';
import watchUserLogInOut from './watchUserLogInOut';
import getMemberByUser from './manipulateMember/getMemberByUser';

import * as actions from 'store/actions';
import updateMember from './manipulateMember/updateMember';
import watchMemberChange from './watchMemberChange';

export default function* authSaga() {
  yield takeLatest(actions.auth.name__REPLACE_USER, replaceUser);

  yield takeLatest(actions.auth.name__LOG_CHECK_SUCCEEDED, logCheckSucceeded);
  yield takeLatest(actions.auth.name__LOG_CHECK_FAILED, logCheckFailed);

  yield takeLatest(actions.auth.name__SIGN_UP, signUp);
  yield takeLatest(actions.auth.name__LOG_IN, logIn);
  yield takeLatest(actions.auth.name__LOG_OUT, logOut);

  yield takeLatest(actions.auth.name__CONTINUE_WITH_GOOGLE, logInGoogle);
  yield takeLatest(actions.auth.name__CONTINUE_WITH_TWITTER, logInTwitter);
  yield takeLatest(actions.auth.name__CONTINUE_WITH_GITHUB, logInGithub);

  yield takeLatest(actions.auth.name__UPDATE_PROFILE, updateProfile);

  yield takeLatest(actions.auth.name__WATCH_USER_LOG_IN_OUT, watchUserLogInOut);
  yield takeLatest(actions.auth.name__WATCH_MEMBER_CHANGE, watchMemberChange);

  yield takeLatest(actions.auth.name__GET_MEMBER_BY_USER, getMemberByUser);
  yield takeLatest(actions.auth.name__UPDATE_MEMBER, updateMember);
}
