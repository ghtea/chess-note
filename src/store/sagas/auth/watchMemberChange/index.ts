import { call, select, put, take } from 'redux-saga/effects';
import { firebaseFirestore } from 'libraries/firebase';

import axios from 'axios';
import apolloClient from 'libraries/apollo';
import { gql, useQuery, FetchResult } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import focusingChess from 'libraries/chess';

import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import { waitForStateChangeToDifferentValue } from 'store/sagas/others/waitForStateChange';

export default function* watchMemberChange(action: actions.auth.type__WATCH_MEMBER_CHANGE) {
  while (true) {
    const newMember: types.auth.Member = yield call(waitForMemberChangeWhileKeepingUserId);

    yield put(
      actions.auth.return__UPDATE_MEMBER({
        ...newMember,
      }),
    );
  }
}

function* waitForMemberChangeWhileKeepingUserId() {
  while (true) {
    const previousMember: types.auth.Member = yield select((state) => state.auth.member);

    yield take([actions.auth.name__REPLACE]);
    const newMember: types.auth.Member = yield select((state) => state.auth.member);
    console.warn(previousMember, newMember)
    if (previousMember?.userId && newMember?.userId && newMember !== previousMember) {
      return newMember;
    }
  }
}
