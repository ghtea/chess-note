import { call, select, put, delay } from 'redux-saga/effects';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import getCorrectSanSeriesWhichIncludePresentSanSeries from './getCorrectSanSeriesWhichIncludePresentSanSeries';

export type GradingResult = 'wrong' | 'complete-answer' | 'partial-answer';

export default function* checkAnswer() {
  const quizPresent: types.present.quiz.Quiz = yield select(
    (state: StateRoot) => state.present.quiz.focusing,
  );
  const quizData: types.data.quiz.Quiz = yield select(
    (state: StateRoot) => state.data.quiz.focusing,
  );

  const remainingCorrectSanSeries: string[] | undefined =
    yield getCorrectSanSeriesWhichIncludePresentSanSeries();

  let gradingResult: GradingResult = 'wrong';

  if (!remainingCorrectSanSeries) {
    gradingResult = 'wrong';
  } else if (remainingCorrectSanSeries.length === quizPresent.sanSeries.length) {
    gradingResult = 'complete-answer';
  } else if (remainingCorrectSanSeries.length > quizPresent.sanSeries.length) {
    gradingResult = 'partial-answer';
  } else {
    // 그외 알수없는 틀림
    gradingResult = 'wrong';
  }

  return gradingResult;
}
