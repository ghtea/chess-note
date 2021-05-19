import { call, select, put, take } from 'redux-saga/effects';
import { firebaseFirestore } from 'libraries/firebase';

import axios from 'axios';
import apolloClient from 'libraries/apollo';
import { gql, useQuery, FetchResult } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import focusingChess from 'libraries/chess';
// import * as config from 'config';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

export default function* watchUserLogInOut(action: actions.quiz.type__WATCH_STARTING_FEN_CHANGE) {
  while (true) {
    const situation: 'logIn' | 'logOut' = yield call(waitForLogInOut);

    if (situation === 'logIn') {
      const user: types.auth.User = yield select((state: RootState) => state.auth.user);
      yield put(
        actions.auth.return__GET_MEMBER_BY_USER({
          userId: user.id,
          userName: user.name
        }),
      );
    } else {
      yield put(
        actions.auth.return__REPLACE({
          keyList: ['user'],
          replacement: null,
        }),
      );
      yield put(
        actions.auth.return__REPLACE({
          keyList: ['member'],
          replacement: null,
        }),
      );
    }
  }
}

function* waitForLogInOut<T>() {
  const valuePrevious: T = yield select((state) => state.auth.user);

  while (true) {
    yield take([actions.auth.name__REPLACE]);
    const valueCurrent: T = yield select((state) => state.auth.user);

    if (valueCurrent !== valuePrevious) {
      if (valuePrevious === null) {
        return 'logIn';
      } else if (valueCurrent === null) {
        return 'logOut';
      }
    }
  }
}
