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

const UPDATE_QUIZ = gql`
    mutation UpdateQuiz($argument: UpdateQuizInputType!){
        updateQuiz(updateQuizInput: $argument) 
            ${types.quiz.gqlQuizString}
    }
`;

const requestUpdateQuiz = (argument: Record<string, unknown>) => {
  return apolloClient.mutate({ mutation: UPDATE_QUIZ, variables: { argument } });
};

// directly access to sportdataAPI -> update firebase (get document on return)
export default function* updateQuiz(action: actions.quiz.type__UPDATE_QUIZ) {
  const {
    id,
    name,
    nextTurn,
    startingFen,
    correctSanSeriesList,
    markedSanSeriesList,
    authorId,
    isPublic,
  } = action.payload;

  if (!startingFen) {
    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        codeSituation: 'UpdateQuiz_NoFenStart__E',
      }),
    );
  } else if (correctSanSeriesList.length === 0) {
    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        codeSituation: 'UpdateQuiz_NoAnswer__E',
      }),
    );
  } else {
    try {
      const argument = {
        id,
        name,
        nextTurn,
        startingFen,
        correctSanSeriesList,
        markedSanSeriesList,
        authorId,
        isPublic,
      };

      type UpdateQuizData = Record<'updateQuiz', types.quiz.Quiz>;
      const res: ApolloQueryResult<UpdateQuizData> = yield call(requestUpdateQuiz, argument); // eslint-disable-line @typescript-eslint/no-explicit-any

      yield put(
        actions.notification.return__ADD_DELETE_BANNER({
          codeSituation: 'UpdateQuiz_Succeeded__S',
        }),
      );

      // console.log(res)

      const quizFromRes = res.data.updateQuiz;
      if (quizFromRes?.id) {
        history.push(`/quiz/edit/${quizFromRes.id}`);
      }
    } catch (error) {
      console.error(error);

      yield put(
        actions.notification.return__ADD_DELETE_BANNER({
          codeSituation: 'UpdateQuiz_UnknownError__E',
        }),
      );
    }
  } // else
}