import { call, select, put } from 'redux-saga/effects';
import { firebaseFirestore } from 'libraries/firebase';
import history from 'libraries/history';

import axios from 'axios';
import apolloClient from 'libraries/apollo';
import { gql, useQuery, FetchResult, DocumentNode, ApolloQueryResult } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import { queryAllByAltText } from '@testing-library/dom';
//import { KindGetListQuiz } from "store/types/data/quiz";

// GraphQL query 문법에 이상 있으면 할당하는 시점에서 에러 발생시키기 때문에 에러 처리한 곳에서 해야 한다

const requestGetQuizListDict = (query: DocumentNode, argument: Record<string, unknown>) => {
  return apolloClient.query({ query, variables: { argument } });
};

// userId 있으면 개인 퀴즈들, 없으면 공개 퀴즈들
function* getQuizListDict(action: actions.quiz.type__GET_QUIZ_LIST_DICT) {
  yield put(
    actions.status.return__REPLACE({
      keyList: ['data', 'quiz', 'publicQuizList'],
      replacement: {
        tried: false,
        loading: true,
        ready: false,
      },
    }),
  );
  yield put(
    actions.status.return__REPLACE({
      keyList: ['data', 'quiz', 'myQuizList'],
      replacement: {
        tried: false,
        loading: true,
        ready: false,
      },
    }),
  );
  const { userId } = action.payload;

  try {
    const GET_QUIZ_LIST_DICT = gql`
            query GetQuizListDict($argument: GetQuizListDictInputType!){
                getQuizListDict(getQuizListDictInputType: $argument) {
                    publicQuizList ${types.quiz.gqlQuizString}
                    myQuizList ${types.quiz.gqlQuizString}
                }
            }
        `;

    const argument = {
      userId,
    };

    type GetQuizListDictData = Record<string, Record<string, types.quiz.Quiz[]>>;
    const response: ApolloQueryResult<GetQuizListDictData> = yield call(
      requestGetQuizListDict,
      GET_QUIZ_LIST_DICT,
      argument,
    ); // eslint-disable-line @typescript-eslint/no-explicit-any

    // console.log(response);

    const publicQuizList = (response.data?.getQuizListDict.publicQuizList ||
      []) as types.quiz.Quiz[];
    const myQuizList = (response.data?.getQuizListDict.myQuizList || []) as types.quiz.Quiz[];

    yield put(
      actions.quiz.return__REPLACE({
        keyList: ['data', 'publicQuizList'],
        replacement: publicQuizList,
      }),
    );
    yield put(
      actions.quiz.return__REPLACE({
        keyList: ['data', 'myQuizList'],
        replacement: myQuizList,
      }),
    );

    yield put(
      actions.status.return__REPLACE({
        keyList: ['data', 'quiz', 'publicQuizList'],
        replacement: {
          tried: true,
          loading: false,
          ready: true,
        },
      }),
    );
    yield put(
      actions.status.return__REPLACE({
        keyList: ['data', 'quiz', 'myQuizList'],
        replacement: {
          tried: true,
          loading: false,
          ready: true,
        },
      }),
    );
  } catch (error) {
    console.error(error);

    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        codeSituation: 'GetListQuiz_UnknownError__E',
      }),
    );

    yield put(
      actions.status.return__REPLACE({
        keyList: ['data', 'quiz', 'publicQuizList'],
        replacement: {
          tried: true,
          loading: false,
          ready: false,
        },
      }),
    );

    yield put(
      actions.status.return__REPLACE({
        keyList: ['data', 'quiz', 'myQuizList'],
        replacement: {
          tried: true,
          loading: false,
          ready: false,
        },
      }),
    );
  }
}

export default getQuizListDict;
