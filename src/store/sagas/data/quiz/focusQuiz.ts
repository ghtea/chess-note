import { call, select, put } from 'redux-saga/effects';
import { firebaseFirestore } from 'libraries/firebase';

import axios from 'axios';
import apolloClient from 'libraries/apollo';
import { gql, useQuery, FetchResult, DocumentNode, ApolloQueryResult } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import history from 'libraries/history';
// import * as config from 'config';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import { queryAllByAltText } from '@testing-library/dom';
// import { KindGetListQuiz } from "store/types/data/quiz";
import focusingChess from 'libraries/chess';

// GraphQL query 문법에 이상 있으면 할당하는 시점에서 에러 발생시키기 때문에 에러 처리한 곳에서 해야 한다

// userId 있으면 개인 퀴즈들, 없으면 공개 퀴즈들
function* focusQuiz(action: actions.data.quiz.type__FOCUS_QUIZ) {
  const { quiz, situation } = action.payload;

  const quizDefault: types.data.quiz.Quiz = {
    id: null,
    name: '',

    nextTurn: 'white',
    startingFen: '',
    correctSanSeriesList: [],
    markedSanSeriesList: [],

    userId: '',
    isPublic: true,
  };

  const quizData: types.data.quiz.Quiz = quiz || quizDefault;

  let fenUsing = quizData.startingFen;

  if (situation === 'creating') {
    focusingChess.reset();
    fenUsing = focusingChess.fen();
  }

  focusingChess.load(quizData.startingFen);

  yield put(
    actions.data.return__REPLACE({
      keyList: ['quiz', 'focusing'],
      replacement: quizData,
    }),
  );

  yield put(
    actions.present.return__REPLACE({
      keyList: ['quiz', 'focusing'],
      replacement: {
        idGame: quizData.id,
        situation: situation,
        fen: fenUsing,
        turn: quizData.nextTurn,
        sanSeries: [],
      },
    }),
  );

  let modeUrl = 'play';

  if (situation === 'playing') {
    modeUrl = 'play';
    history.push(`/quiz/${modeUrl}/${quizData.id}`);
  } else if (situation === 'creating') {
    modeUrl = 'create';
    history.push(`/quiz/${modeUrl}`);
  } else if (situation === 'editing') {
    modeUrl = 'edit';
    history.push(`/quiz/${modeUrl}/${quizData.id}`);
  }
}

export default focusQuiz;
