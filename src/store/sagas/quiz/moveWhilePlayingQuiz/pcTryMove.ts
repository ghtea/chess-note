import { call, select, put, delay } from 'redux-saga/effects';

import { ChessInstance, Move, Square } from 'chess.js';
import focusingChess from 'libraries/chess';

import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import getCorrectSanSeriesWhichIncludeCurrentSanSeries from './getCorrectSanSeriesWhichIncludeCurrentSanSeries';
import applySucceededMoveToQuizState from './applySucceededMoveToQuizState';

export default function* pcTryMove() {
  const focusingQuizState: types.quiz.QuizState = yield select(
    (state: StateRoot) => state.quiz.state.focusing,
  );
  const focusingQuizData: types.quiz.Quiz = yield select(
    (state: StateRoot) => state.quiz.data.focusing,
  );

  const remainingCorrectSanSeries: string[] =
    yield getCorrectSanSeriesWhichIncludeCurrentSanSeries();

  const nextSan = remainingCorrectSanSeries[focusingQuizState.sanSeries.length - 1 + 1];
  const pcTriedMoveResult = focusingChess.move(nextSan);

  if (!pcTriedMoveResult) {
    console.log("pc's move was not valid");
  } else {
    yield applySucceededMoveToQuizState(pcTriedMoveResult);
  }
}
