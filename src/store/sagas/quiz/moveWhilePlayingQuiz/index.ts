import { call, select, put, delay } from 'redux-saga/effects';
//import { firebaseFirestore } from "firebaseApp";

import { ChessInstance, Move, Square } from 'chess.js';
import focusingChess from 'libraries/chess';

// import * as config from 'config';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import pcTryMove from './pcTryMove';
import applySucceededMoveToQuizState from './applySucceededMoveToQuizState';
import checkAnswer, { GradingResult } from './checkAnswer';

export default function* moveWhilePlayingQuiz(action: actions.quiz.type__MOVE_IN_QUIZ_PLAYING) {
  const { from, to, san } = action.payload;

  try {
    const playerTriedMoveResult = focusingChess.move(
      san || { from: from as Square, to: to as Square },
    );
    if (playerTriedMoveResult === null) {
      console.log("player's move was not valid");
    } else {
      yield applySucceededMoveToQuizState(playerTriedMoveResult);

      yield delay(1000);

      const gradingResult: GradingResult = yield checkAnswer();

      if (gradingResult === 'wrong') {
        yield put(
          actions.notification.return__ADD_DELETE_BANNER({
            situationCode: 'PlayQuiz_Wrong__W',
          }),
        );
        yield put(
          actions.quiz.return__REPLACE({
            keyList: ['state', 'situation'],
            replacement: 'playing-failed',
          }),
        );
      } else if (gradingResult === 'complete-answer') {
        yield put(
          actions.notification.return__ADD_DELETE_BANNER({
            situationCode: 'PlayQuiz_Correct__S',
          }),
        );
        yield put(
          actions.quiz.return__REPLACE({
            keyList: ['state', 'situation'],
            replacement: 'playing-solved',
          }),
        );
      } else {
        //    gradingResult === 'partial-answer'
        yield pcTryMove();
      }
    }
  } catch (error) {
    console.error(error);
  }
}
