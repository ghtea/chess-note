import { call, select, put } from 'redux-saga/effects';
//import { firebaseFirestore } from "firebaseApp";

import { ChessInstance, Move, Square } from 'chess.js';
import focusingChess from 'libraries/chess';

// import * as config from 'config';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import applySucceededMoveToQuizPresent from '../moveWhilePlayingQuiz/applySucceededMoveToQuizPresent';

export default function* moveWhileEditingQuiz(action: actions.quiz.type__MOVE_WHILE_EDITING_QUIZ) {
  const { from, to, san } = action.payload;

  const focusingQuizState: types.quiz.QuizState = yield select(
    (state: StateRoot) => state.quiz.state.focusing,
  );

  try {
    const triedMoveResult = focusingChess.move(san || { from: from as Square, to: to as Square });

    if (triedMoveResult) {
      yield applySucceededMoveToQuizPresent(triedMoveResult);
    } else {
      console.log('move was not valid');
    }
  } catch (error) {
    console.error(error);
  }
}
