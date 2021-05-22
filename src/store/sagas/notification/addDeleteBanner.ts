import { delay, put, takeEvery, select } from 'redux-saga/effects';

import * as actions from 'store/actions';
import * as types from 'store/types';

import { Banner } from 'store/reducers/notification';
import { RootState } from 'store/reducers';

import { v4 as uuidv4 } from 'uuid';

function* addDeleteBanner(action: actions.notification.type__ADD_DELETE_BANNER) {
  const bannerListPrevious: Banner[] = yield select(
    (state: RootState) => state.notification.bannerList,
  );

  const id = uuidv4();

  const { situationCode, messageValues } = action.payload;

  let situationKind: types.notification.KindSituation = 'warning';
  if (situationCode.match(/__S$/)) {
    situationKind = 'success';
  } else if (situationCode.match(/__H$/)) {
    situationKind = 'hint';
  } else if (situationCode.match(/__W$/)) {
    situationKind = 'warning';
  } else if (situationCode.match(/__E$/)) {
    situationKind = 'error';
  }

  const messageId = `Notification.${situationCode}`;

  let levelTimeBanner: types.notification.LevelTimeBanner = 'normal';

  if (situationKind === 'success') {
    levelTimeBanner = 'short';
  } else if (situationKind === 'hint') {
    levelTimeBanner = 'normal';
  } else if (situationKind === 'error') {
    levelTimeBanner = 'long';
  } else if (situationKind === 'warning') {
    levelTimeBanner = 'normal';
  }

  const msTime: types.notification.MsTimeBanner = types.notification.MsTimeBanner[levelTimeBanner];

  const bannerAdding = {
    id: id,
    situationCode: situationCode,
    situationKind: situationKind,
    messageId: messageId,
    messageValues: messageValues,
    msTime: msTime,
  };

  const bannerListNew = [bannerAdding, ...bannerListPrevious];

  yield put(
    actions.notification.return__REPLACE({
      keyList: ['bannerList'],
      replacement: bannerListNew,
    }),
  );

  yield delay(msTime);

  yield put(
    actions.notification.return__DELETE_BANNER({
      id: id,
    }),
  );
}

export default addDeleteBanner;
