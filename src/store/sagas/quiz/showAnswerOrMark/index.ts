import { call, select, put, delay } from 'redux-saga/effects';
//import { firebaseFirestore } from "firebaseApp";

import { ChessInstance, Move, Square } from 'chess.js';
import focusingChess from 'libraries/chess';
import { correctChessMoveTree, markedChessMoveTree } from 'components/Main/Quiz/chessMoveTree';

// import * as config from 'config';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import applySucceededMoveToQuizState from '../moveWhilePlayingQuiz/applySucceededMoveToQuizState';
import backToStart from '../backToStart';

export default function* showAnswerOrMark(action: actions.quiz.type__SHOW_ANSWER_OR_MARK) {
  const { index, kind } = action.payload;
  try {
    yield put(
      actions.appearance.return__REPLACE({
        keyList: ['showing', 'modal', kind === 'answer' ? 'quizManageAnswers' : 'quizManageMarks' ],
        replacement: false,
      }),
    );

    yield put(actions.quiz.return__BACK_TO_START());

    const chessMoveTree = kind === 'answer' ? correctChessMoveTree : markedChessMoveTree;

    const list = chessMoveTree.returnSanSeriesList();
    const showingSanSeries = list[index];

    const showingSanQueue = [...showingSanSeries];
    while (showingSanQueue.length > 0) {
      const triedMoveResult = focusingChess.move(showingSanQueue.shift() as string);

      if (triedMoveResult) {
        yield delay(1000);
        yield applySucceededMoveToQuizState(triedMoveResult);
      } else {
        yield put(
          actions.notification.return__ADD_DELETE_BANNER({
            codeSituation: 'ShowAnswerOrMark_NotValid__E',
          }),
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
}
