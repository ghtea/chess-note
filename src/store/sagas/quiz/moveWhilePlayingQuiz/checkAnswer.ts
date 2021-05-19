import { call, select, put, delay } from 'redux-saga/effects';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import getCorrectSanSeriesWhichIncludeCurrentSanSeries from './getCorrectSanSeriesWhichIncludeCurrentSanSeries';

export type GradingResult = 'wrong' | 'complete-answer' | 'partial-answer';

export default function* checkAnswer() {
  const focusingQuizState: types.quiz.QuizState = yield select(
    (state: RootState) => state.quiz.state.focusing,
  );
  const focusingQuizData: types.quiz.Quiz = yield select(
    (state: RootState) => state.quiz.data.focusing,
  );

  const remainingCorrectSanSeries: string[] | undefined =
    yield getCorrectSanSeriesWhichIncludeCurrentSanSeries();

  let gradingResult: GradingResult = 'wrong';

  if (!remainingCorrectSanSeries) {
    gradingResult = 'wrong';
  } else if (remainingCorrectSanSeries.length === focusingQuizState.sanSeries.length) {
    gradingResult = 'complete-answer';
  } else if (remainingCorrectSanSeries.length > focusingQuizState.sanSeries.length) {
    gradingResult = 'partial-answer';
  } else {
    // 그외 알수없는 틀림
    gradingResult = 'wrong';
  }

  return gradingResult;
}
