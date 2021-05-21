import { call, select, put } from 'redux-saga/effects';
import { firebaseFirestore } from 'libraries/firebase';

import axios from 'axios';
import apolloClient from 'libraries/apollo';
import { gql, useQuery, FetchResult, DocumentNode, ApolloQueryResult } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import history from 'libraries/history';
// import * as config from 'config';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import { queryAllByAltText } from '@testing-library/dom';
// import { KindGetListQuiz } from "store/types/data/quiz";
import focusingChess from 'libraries/chess';

// GraphQL query 문법에 이상 있으면 할당하는 시점에서 에러 발생시키기 때문에 에러 처리한 곳에서 해야 한다

const requestGetQuizById = (query: DocumentNode, argument: Record<string, unknown>) => {
  return apolloClient.query({ query, variables: { argument } });
};

// userId 있으면 개인 퀴즈들, 없으면 공개 퀴즈들
function* getQuizById(action: actions.quiz.type__GET_QUIZ_BY_ID) {
  yield put(
    actions.status.return__REPLACE({
      keyList: ['data', 'quiz', 'focusing'],
      replacement: {
        tried: false,
        loading: true,
        ready: false,
      },
    }),
  );

  const { quizId, userIdInApp, situation } = action.payload;
  //console.log('getQuizById: ', quizId)
  try {
    const GET_QUIZ_BY_ID = gql`
            query GetQuizById($argument: GetQuizByIdInputType!){
                getQuizById(getQuizByIdInput: $argument)
                    ${types.quiz.gqlQuizString}
            }
        `;

    const argument = {
      id: quizId,
      userId: userIdInApp,
    };

    type GetQuizByIdData = Record<string, types.quiz.Quiz>;
    const response: ApolloQueryResult<GetQuizByIdData> = yield call(
      requestGetQuizById,
      GET_QUIZ_BY_ID,
      argument,
    ); // eslint-disable-line @typescript-eslint/no-explicit-any
    // console.log(response);
    const quizFromRes = response.data?.getQuizById;

    if (quizFromRes) {
      yield put(
        actions.quiz.return__FOCUS_QUIZ({
          quiz: quizFromRes,
          situation: situation,
        }),
      );

      yield put(
        actions.status.return__REPLACE({
          keyList: ['data', 'quiz', 'focusing'],
          replacement: {
            tried: true,
            loading: false,
            ready: true,
          },
        }),
      );
    } else {
      //console.log('hello1')
      // const quizDefault = {
      //     list: [],
      //     index: null,
      //     focusing: null,
      // }
      history.push('/quiz');
      yield put(
        actions.notification.return__ADD_DELETE_BANNER({
          situationCode: 'GetQuiz_NoQuiz__E',
        }),
      );

      yield put(
        actions.status.return__REPLACE({
          keyList: ['data', 'quiz', 'focusing'],
          replacement: {
            tried: true,
            loading: false,
            ready: false,
          },
        }),
      );
    }
  } catch (error) {
    //console.log('hello2')
    console.error(error);

    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: 'GetQuiz_UnknownError__E',
      }),
    );

    yield put(
      actions.status.return__REPLACE({
        keyList: ['data', 'quiz', 'focusing'],
        replacement: {
          tried: true,
          loading: false,
          ready: false,
        },
      }),
    );
  }
}

export default getQuizById;
