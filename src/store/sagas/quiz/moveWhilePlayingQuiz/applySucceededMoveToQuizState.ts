import { call, select, put, delay } from 'redux-saga/effects';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import focusingChess from 'libraries/chess';
import { Move } from 'chess.js';

export default function* applySucceededMoveToQuizState(succeededMove: Move) {
  const focusingQuizState: types.quiz.QuizState = yield select(
    (state: RootState) => state.quiz.state.focusing,
  );

  const replacement = {
    ...focusingQuizState,
    fen: focusingChess.fen(),
    turn: focusingChess.turn() === 'w' ? 'white' : 'black',
    sanSeries: [...focusingQuizState.sanSeries, succeededMove.san],
  };

  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['state', 'focusing'],
      replacement,
    }),
  );
}
