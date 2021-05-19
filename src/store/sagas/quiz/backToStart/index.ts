import { call, select, put, delay } from 'redux-saga/effects';
//import { firebaseFirestore } from "firebaseApp";

import { ChessInstance, Move, Square } from 'chess.js';
import focusingChess from 'libraries/chess';

// import * as config from 'config';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

function* backToStart(action: actions.quiz.type__BACK_TO_START) {
  const focusingQuizData: types.quiz.Quiz = yield select(
    (state: RootState) => state.quiz.data.focusing,
  );
  const focusingQuizState: types.quiz.QuizState = yield select(
    (state: RootState) => state.quiz.state.focusing,
  );

  focusingChess.load(focusingQuizData.startingFen);

  const replacement = {
    ...focusingQuizState,
    fen: focusingQuizData.startingFen,
    turn: focusingChess.turn() === 'w' ? 'white' : 'black',
    sanSeries: [],
  };
  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['state', 'focusing'],
      replacement: replacement,
    }),
  );
}

export default backToStart;
