import { call, select, put, delay } from 'redux-saga/effects';
//import { firebaseFirestore } from "firebaseApp";

import { ChessInstance, Move, Square } from 'chess.js';
import focusingChess from 'libraries/chess';

// import * as config from 'config';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

export default function* backToPrevious(action: actions.data.quiz.type__BACK_TO_PREVIOUS) {

  yield backOneMove();

  // 멈춘 위치가, 컴퓨터가 두어야하는 턴이면 한번 더 뒤로가기
  const nextTurn: 'white' | 'black' = yield select(
    (state: StateRoot) => state.data.quiz.focusing.nextTurn
  );
  const situation: types.present.quiz.Situation = yield select(
    (state: StateRoot) => state.present.quiz.focusing.situation
  );
  if (situation === 'playing' || situation === 'failed' || situation === 'solved') {
    if (nextTurn[0] !== focusingChess.turn()) {
      yield delay(500);
      yield backOneMove();
    }
  }
}

function* backOneMove() {
  const quizData: types.data.quiz.Quiz = yield select(
    (state: StateRoot) => state.data.quiz.focusing,
  );
  const quizPresent: types.present.quiz.Quiz = yield select(
    (state: StateRoot) => state.present.quiz.focusing,
  );

  focusingChess.undo();
  const newSanSeries = [...quizPresent.sanSeries];
  newSanSeries.pop();

  const replacement = {
    ...quizPresent,
    fen: focusingChess.fen(),
    turn: focusingChess.turn() === 'w' ? 'white' : 'black',
    sanSeries: newSanSeries,
  };
  yield put(
    actions.present.return__REPLACE({
      keyList: ['quiz', 'focusing'],
      replacement: replacement,
    }),
  );
}
