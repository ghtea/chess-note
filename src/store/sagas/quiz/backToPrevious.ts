import { call, select, put, delay } from 'redux-saga/effects';
//import { firebaseFirestore } from "firebaseApp";

import { ChessInstance, Move, Square } from 'chess.js';
import focusingChess from 'libraries/chess';

// import * as config from 'config';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

export default function* backToPrevious(action: actions.quiz.type__BACK_TO_PREVIOUS) {
  yield backOneMove();

  // 멈춘 위치가, 컴퓨터가 두어야하는 턴이면 한번 더 뒤로가기
  const nextTurn: 'white' | 'black' = yield select(
    (state: StateRoot) => state.quiz.data.focusing.nextTurn,
  );
  const situation: types.quiz.Situation = yield select(
    (state: StateRoot) => state.quiz.state.focusing.situation,
  );
  if (situation === 'playing' || situation === 'failed' || situation === 'solved') {
    if (nextTurn[0] !== focusingChess.turn()) {
      yield delay(500);
      yield backOneMove();
    }
  }
}

function* backOneMove() {
  const focusingQuizData: types.quiz.Quiz = yield select((state: StateRoot) => state.quiz.data.focusing);
  const focusingQuizState: types.quiz.QuizState = yield select(
    (state: StateRoot) => state.quiz.state.focusing,
  );

  focusingChess.undo();
  const newSanSeries = [...focusingQuizState.sanSeries];
  newSanSeries.pop();

  const replacement = {
    ...focusingQuizState,
    fen: focusingChess.fen(),
    turn: focusingChess.turn() === 'w' ? 'white' : 'black',
    sanSeries: newSanSeries,
  };
  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['state', 'focusing'],
      replacement: replacement,
    }),
  );
}
