import { call, spawn, put, takeEvery, select } from 'redux-saga/effects';

import Cookies from 'js-cookie';

import * as actions from 'store/actions';

import { RootState } from 'store/reducers';

function* decideTheme(action: actions.status.type__DECIDE_THEME) {
  const optionThemeCurrent: string = yield select(
    (state: RootState) => state.appearance.theme.option,
  );

  if (optionThemeCurrent === 'always-light') {
    yield put(
      actions.appearance.return__REPLACE({
        keyList: ['theme', 'name'],
        replacement: 'light',
      }),
    );
  } else if (optionThemeCurrent === 'always-dark') {
    yield put(
      actions.appearance.return__REPLACE({
        keyList: ['theme', 'name'],
        replacement: 'dark',
      }),
    );
  } else if (optionThemeCurrent === 'auto') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('browser is dark mode');
      yield put(
        actions.appearance.return__REPLACE({
          keyList: ['theme', 'name'],
          replacement: 'dark',
        }),
      );
    } else {
      console.log('browser is light mode');
      yield put(
        actions.appearance.return__REPLACE({
          keyList: ['theme', 'name'],
          replacement: 'light',
        }),
      );
    }
  }
}

export default decideTheme;
