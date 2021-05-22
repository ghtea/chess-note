import { delay, put, takeEvery, select } from 'redux-saga/effects';

import * as actions from 'store/actions';
import { RootState } from 'store/reducers';

function* deleteCodeSituationOthers(
  action: actions.notification.type__DELETE_CODE_SITUATION_OTHERS,
) {
  const otherSituationCodeListPrevious: string[] = yield select(
    (state: RootState) => state.notification.otherSituationCodeList,
  );

  let otherSituationCodeListNew: string[] = otherSituationCodeListPrevious;

  if (action.payload.situationCode) {
    otherSituationCodeListNew = otherSituationCodeListPrevious.filter(
      (code) => code !== action.payload.situationCode,
    );
  } else if (action.payload.regex) {
    otherSituationCodeListNew = otherSituationCodeListPrevious.filter((code) =>
      action.payload.regex?.test(code),
    );
  }

  yield put(
    actions.notification.return__REPLACE({
      keyList: ['otherSituationCodeList'],
      replacement: otherSituationCodeListNew,
    }),
  );
}

export default deleteCodeSituationOthers;
