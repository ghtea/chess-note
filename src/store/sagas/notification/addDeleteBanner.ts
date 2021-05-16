import { delay, put, takeEvery, select } from 'redux-saga/effects';

import * as actions from 'store/actions';
import * as types from 'store/types';

import { Banner } from 'store/reducers/notification';
import { StateRoot } from 'store/reducers';

import { v4 as uuidv4 } from 'uuid';

function* addDeleteBanner(action: actions.notification.type__ADD_DELETE_BANNER) {
  const bannerListPrevious: Banner[] = yield select(
    (state: StateRoot) => state.notification.bannerList,
  );

  const id = uuidv4();

  const codeSituation: string = action.payload.codeSituation;

  let kindSituation: types.notification.KindSituation = 'warning';
  if (codeSituation.match(/__S$/)) {
    kindSituation = 'success';
  } else if (codeSituation.match(/__H$/)) {
    kindSituation = 'hint';
  } else if (codeSituation.match(/__W$/)) {
    kindSituation = 'warning';
  } else if (codeSituation.match(/__E$/)) {
    kindSituation = 'error';
  }

  const idMessage = `Notification.${codeSituation}`;

  let levelTimeBanner: types.notification.LevelTimeBanner = 'normal';

  if (kindSituation === 'success') {
    levelTimeBanner = 'short';
  } else if (kindSituation === 'hint') {
    levelTimeBanner = 'normal';
  } else if (kindSituation === 'error') {
    levelTimeBanner = 'long';
  } else if (kindSituation === 'warning') {
    levelTimeBanner = 'normal';
  }

  const msTime: types.notification.MsTimeBanner = types.notification.MsTimeBanner[levelTimeBanner];

  const bannerAdding = {
    id: id,
    codeSituation: codeSituation,
    kindSituation: kindSituation,
    idMessage: idMessage,
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
