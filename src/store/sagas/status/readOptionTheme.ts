import { call, spawn, put, takeEvery, select } from 'redux-saga/effects';

import Cookies from 'js-cookie';

import * as actions from 'store/actions';
import { StateRoot } from 'store/reducers';

function* readOptionTheme(action: actions.status.type__READ_OPTION_THEME) {
  const optionThemeCookie: string | undefined = Cookies.get('optionTheme');

  //console.log(optionThemeCookie);

  if (typeof optionThemeCookie === 'string') {
    yield put(
      actions.appearance.return__REPLACE({
        keyList: ['theme', 'option'],
        replacement: optionThemeCookie,
      }),
    );

    yield put(actions.status.return__DECIDE_THEME());
  }
}

export default readOptionTheme;
