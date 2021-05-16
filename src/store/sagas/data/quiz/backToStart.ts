import { call, select, put, delay } from 'redux-saga/effects';
//import { firebaseFirestore } from "firebaseApp";

import { ChessInstance, Move, Square } from 'chess.js';
import chessFocusing from 'libraries/chess';

// import * as config from 'config';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

function* backToStart(action: actions.data.quiz.type__BACK_TO_START) {
  const quizData: types.data.quiz.Quiz = yield select(
    (state: StateRoot) => state.data.quiz.focusing,
  );
  const quizPresent: types.present.quiz.Quiz = yield select(
    (state: StateRoot) => state.present.quiz.focusing,
  );

  chessFocusing.load(quizData.startingFen);

  const replacement = {
    ...quizPresent,
    fen: quizData.startingFen,
    turn: chessFocusing.turn() === 'w' ? 'white' : 'black',
    sanSeries: [],
  };
  yield put(
    actions.present.return__REPLACE({
      keyList: ['quiz', 'focusing'],
      replacement: replacement,
    }),
  );
}

export default backToStart;
