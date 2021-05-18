import { call, spawn, put, takeEvery, takeLatest } from 'redux-saga/effects';
//import axios from "axios";
//import * as config from '../../config';

import * as actions from 'store/actions';
import detectLanguage from './detectLanguage';

import readOptionTheme from './readOptionTheme';
import decideTheme from './decideTheme';

export default function* statusSaga() {
  yield takeEvery(actions.status.name__DETECT_LANGUAGE, detectLanguage);

  yield takeEvery(actions.status.name__READ_OPTION_THEME, readOptionTheme);
  yield takeEvery(actions.status.name__DECIDE_THEME, decideTheme);
}
