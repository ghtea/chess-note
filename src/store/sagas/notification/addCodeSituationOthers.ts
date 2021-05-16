import { delay, put, takeEvery, select } from 'redux-saga/effects';

import * as actions from 'store/actions';
import { StateRoot } from 'store/reducers';

function* addCodeSituationOthers(action: actions.notification.type__ADD_CODE_SITUATION_OTHERS) {
  const otherSituationCodeListPrevious: string[] = yield select(
    (state: StateRoot) => state.notification.otherSituationCodeList,
  );

  const otherSituationCodeListNew = [
    action.payload.codeSituation,
    ...otherSituationCodeListPrevious,
  ];

  yield put(
    actions.notification.return__REPLACE({
      keyList: ['otherSituationCodeList'],
      replacement: otherSituationCodeListNew,
    }),
  );
}

export default addCodeSituationOthers;
