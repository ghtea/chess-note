import { call, select, put, getContext } from 'redux-saga/effects';

import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

export default function* checkIfAuthorizedUserIsLoggedInUser(authorizedUserId: string) {
  const userIdInApp: undefined | string = yield select((state: RootState) => state.auth.user?.id);

  if (authorizedUserId === userIdInApp) {
    return true;
  } else {
    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        codeSituation: 'NotAuthorized__E',
      }),
    );
    return false;
  }
}
