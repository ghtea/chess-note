import { call, select, put, delay } from 'redux-saga/effects';
//import { firebaseFirestore } from "firebaseApp";

import { ChessInstance, Move, Square } from 'chess.js';
import focusingChess from 'libraries/chess';
import { correctChessMoveTree, markedChessMoveTree } from 'components/Main/Quiz/chessMoveTree';

import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import applySucceededMoveToQuizState from '../moveWhilePlayingQuiz/applySucceededMoveToQuizState';
import backToStart from '../backToStart';

export default function* showOneAnswerOrMark(index:number, kind: 'answer' | 'mark') {
  try {
    yield put(
      actions.appearance.return__REPLACE({
        keyList: ['showing', 'modal', kind === 'answer' ? 'quizManageAnswers' : 'quizManageMarks'],
        replacement: false,
      }),
    );

    yield put(actions.quiz.return__BACK_TO_START()); // rnbqkbnr/ppppp1pp/8/5p2/4P3/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 2
    yield delay(1000);
    const chessMoveTree = kind === 'answer' ? correctChessMoveTree : markedChessMoveTree;

    const list = chessMoveTree.returnSanSeriesList();
    //console.log(chessMoveTree)
    const showingSanSeries = list[index];

    const showingSanQueue = [...showingSanSeries];

    // 1 수 씩 움직임
    while (showingSanQueue.length > 0) {
      const triedMoveResult = focusingChess.move(showingSanQueue.shift() as string);

      //console.warn(triedMoveResult)
      if (triedMoveResult) {
        yield delay(1000);
        yield applySucceededMoveToQuizState(triedMoveResult);
        
      } else {
        yield put(
          actions.notification.return__ADD_DELETE_BANNER({
            situationCode: 'ShowAnswerOrMark_NotValid__E',
          }),
        );
        return; // 나가기
      }
    }

    // 한 정답/참고표시 의 모든 수가 성공적으로 끝났을 때
    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: `ShowAnswerOrMark_${kind === 'answer' ? 'Answer' : 'Mark'}Ended__H`,
        messageValues: {
          index: index+1,
        },
      }),
    );
  } catch (error) {
    console.error(error);
  }
}
