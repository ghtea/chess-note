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

const DELETE_QUIZ = gql`
  mutation DeleteQuiz($argument: DeleteQuizInputType!) {
    deleteQuiz(deleteQuizInputType: $argument)
  }
`;

const requestDeleteQuiz = (argument: Record<string, unknown>) => {
  return apolloClient.mutate({ mutation: DELETE_QUIZ, variables: { argument } });
};

// directly access to sportdataAPI -> update firebase (get document on return)
export default function* deleteQuiz(action: actions.quiz.type__DELETE_QUIZ) {
  const { id, userId } = action.payload;

  // 권한은 서버쪽에서 확인
  try {
    const argument = {
      id,
      userId,
    };

    type DeleteQuizData = Record<'deleteQuiz', boolean>;
    const res: ApolloQueryResult<DeleteQuizData> = yield call(requestDeleteQuiz, argument); // eslint-disable-line @typescript-eslint/no-explicit-any
    yield applyChangeInQuizList (id);

    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        codeSituation: 'DeleteQuiz_Succeeded__S',
      }),
    );
  } catch (error) {
    console.error(error);

    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        codeSituation: 'DeleteQuiz_UnknownError__E',
      }),
    );
  }
}

function* applyChangeInQuizList (deletedQuizId: string){

  type quizData = {
    myQuizList: types.quiz.Quiz[];
    publicQuizList: types.quiz.Quiz[];
    focusing: types.quiz.Quiz;
  }
  const quizData: quizData = yield select(
    (state: RootState) => state.quiz.data,
  );

  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['data'],
      replacement: {
        ...quizData,
        myQuizList: [...quizData.myQuizList].filter(e=>e.id !== deletedQuizId),
        publicQuizList: [...quizData.publicQuizList].filter(e=>e.id !== deletedQuizId)
      }
    }),
  );
}
