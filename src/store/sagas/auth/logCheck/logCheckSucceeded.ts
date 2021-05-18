import { call, spawn, put, takeEvery } from 'redux-saga/effects';
import { firebaseAuth } from 'libraries/firebase';


import * as actions from 'store/actions';
import applyLoggedInUser from '../logIn/applyLoggedInUser';

function* logCheckSucceeded(action: actions.auth.type__LOG_CHECK_SUCCEEDED) {
  yield applyLoggedInUser();
}

export default logCheckSucceeded;
