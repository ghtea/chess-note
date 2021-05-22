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

const CREATE_QUIZ = gql`
    mutation CreateQuiz($argument: CreateQuizInputType!){
        createQuiz(createQuizInput: $argument) 
            ${types.quiz.gqlQuizString}
    }
`;

const requestCreateQuiz = (argument: Record<string, unknown>) => {
  return apolloClient.mutate({ mutation: CREATE_QUIZ, variables: { argument } });
};

// directly access to sportdataAPI -> update firebase (get document on return)
export default function* createQuiz(action: actions.quiz.type__CREATE_QUIZ) {
  const {
    name,
    nextTurn,
    startingFen,
    correctSanSeriesList,
    markedSanSeriesList,
    isPublic,
  } = action.payload;

  const userIdInApp: types.quiz.Quiz[] = yield select((state: RootState) => state.auth.user?.id);

  if (!startingFen) {
    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: 'CreateQuiz_NoFenStart__E',
      }),
    );
  } else if (correctSanSeriesList.length === 0) {
    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: 'CreateQuiz_NoAnswer__E',
      }),
    );
  } else {
    try {
      const argument = {
        name,
        nextTurn,
        startingFen,
        correctSanSeriesList,
        markedSanSeriesList,
        authorId: userIdInApp,
        isPublic,
      };

      type CreateQuizData = Record<'createQuiz', types.quiz.Quiz>;
      const res: ApolloQueryResult<CreateQuizData> = yield call(requestCreateQuiz, argument); // eslint-disable-line @typescript-eslint/no-explicit-any

      yield put(
        actions.notification.return__ADD_DELETE_BANNER({
          situationCode: 'CreateQuiz_Succeeded__S',
        }),
      );

      // console.log(res)

      const quizFromRes = res.data?.createQuiz;
      if (quizFromRes.id) {
        history.push(`/quiz/edit/${quizFromRes.id}`);
      }
    } catch (error) {
      console.error(error);

      yield put(
        actions.notification.return__ADD_DELETE_BANNER({
          situationCode: 'CreateQuiz_UnknownError__E',
        }),
      );
    }
  } // else
}
