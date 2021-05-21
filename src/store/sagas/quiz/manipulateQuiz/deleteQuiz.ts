import { call, select, put } from 'redux-saga/effects';
import { firebaseFirestore } from 'libraries/firebase';

import history from 'libraries/history';

import axios from 'axios';
import apolloClient from 'libraries/apollo';
import { gql, useQuery, FetchResult, ApolloQueryResult } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import checkIfAuthorizedUserIsLoggedInUser from 'store/sagas/auth/common/checkIfAuthorizedUserIsLoggedInUser';

const DELETE_QUIZ = gql`
  mutation DeleteQuiz($argument: DeleteQuizInputType!) {
    deleteQuiz(deleteQuizInput: $argument)
  }
`;

const requestDeleteQuiz = (argument: Record<string, unknown>) => {
  return apolloClient.mutate({ mutation: DELETE_QUIZ, variables: { argument } });
};

// directly access to sportdataAPI -> update firebase (get document on return)
export default function* deleteQuiz(action: actions.quiz.type__DELETE_QUIZ) {
  const { quizId } = action.payload;

  const userIdInApp: types.quiz.Quiz[] = yield select((state: RootState) => state.auth.user?.id);

  // 권한은 서버쪽에서 확인
  try {
    const argument = {
      id: quizId,
      userId: userIdInApp,
    };

    type DeleteQuizData = Record<'deleteQuiz', boolean>;
    const res: ApolloQueryResult<DeleteQuizData> = yield call(requestDeleteQuiz, argument); // eslint-disable-line @typescript-eslint/no-explicit-any
    yield applyChangeInQuizList(quizId);

    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: 'DeleteQuiz_Succeeded__S',
      }),
    );
  } catch (error) {
    console.error(error);

    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: 'DeleteQuiz_UnknownError__E',
      }),
    );
  }
}

function* applyChangeInQuizList(deletedQuizId: string) {
  const quizList: types.quiz.Quiz[] = yield select((state: RootState) => state.quiz.data.list);

  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['data', 'list'],
      replacement: quizList.filter((e) => e.id !== deletedQuizId),
    }),
  );
}
