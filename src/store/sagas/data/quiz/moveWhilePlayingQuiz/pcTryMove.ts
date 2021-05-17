import { call, select, put, delay } from 'redux-saga/effects';

import { ChessInstance, Move, Square } from 'chess.js';
import focusingChess from 'libraries/chess';

import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import getCorrectSanSeriesWhichIncludePresentSanSeries from './getCorrectSanSeriesWhichIncludePresentSanSeries';
import applySucceededMoveToQuizPresent from './applySucceededMoveToQuizPresent';

export default function* pcTryMove() {
  const quizPresent: types.present.quiz.Quiz = yield select(
    (state: StateRoot) => state.present.quiz.focusing,
  );
  const quizData: types.data.quiz.Quiz = yield select(
    (state: StateRoot) => state.data.quiz.focusing,
  );

  const remainingCorrectSanSeries: string[] =
    yield getCorrectSanSeriesWhichIncludePresentSanSeries();

  const nextSan = remainingCorrectSanSeries[quizPresent.sanSeries.length - 1 + 1];
  const pcTriedMoveResult = focusingChess.move(nextSan);

  if (!pcTriedMoveResult) {
    console.log("pc's move was not valid");
  } else {
    yield applySucceededMoveToQuizPresent(pcTriedMoveResult);
  }
}
