import { call, select, put, delay } from 'redux-saga/effects';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import focusingChess from 'libraries/chess';
import { Move } from 'chess.js';

export default function* applySucceededMoveToQuizPresent(succeededMove: Move) {
  const quizPresent: types.present.quiz.Quiz = yield select(
    (state: StateRoot) => state.present.quiz.focusing,
  );

  const replacement = {
    ...quizPresent,
    fen: focusingChess.fen(),
    turn: focusingChess.turn() === 'w' ? 'white' : 'black',
    sanSeries: [...quizPresent.sanSeries, succeededMove.san],
  };

  yield put(
    actions.present.return__REPLACE({
      keyList: ['quiz', 'focusing'],
      replacement,
    }),
  );
}