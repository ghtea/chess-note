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
import showOneAnswerOrMark from './showOneAnswerOrMark';

export default function* showAnswerOrMark(action: actions.quiz.type__SHOW_ANSWER_OR_MARK) {
  const { index, length, kind } = action.payload;
  try {
    if (index !== undefined && index >= 0){
      yield showOneAnswerOrMark(index, kind);
    }
    else if (length){
      for (let i=0; i<length; i++){
        yield showOneAnswerOrMark(i, kind);
        yield delay(1500);
      }

    }
  } catch (error) {
    console.error(error);
  }
}
