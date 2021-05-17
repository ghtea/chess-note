import { call, select, put, delay } from 'redux-saga/effects';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

export default function* getCorrectSanSeriesWhichIncludePresentSanSeries() {
  const quizPresent: types.present.quiz.Quiz = yield select(
    (state: StateRoot) => state.present.quiz.focusing,
  );
  const quizData: types.data.quiz.Quiz = yield select(
    (state: StateRoot) => state.data.quiz.focusing,
  );

  const correctSanSeriesList = quizData.correctSanSeriesList;
  const presentSanSeries = quizPresent.sanSeries;
  // 이전까지의 listSanMove (quizPresent) 에 현재 움직임을 포함한 배열을
  // 처음부터 포함하는 정답 움직임이 있어야 한다
  //const sanSeriesUntilThis = [...quizPresent.sanSeries, result?.san];

  // 정답 움직임 모음집 에서 여태까지의 움직임과 일치하는 모음집 부분집합 구하기
  const remainingCorrectSanSeriesList = correctSanSeriesList.filter((sanSeriesCorrectEach) => {
    const indexIncludingAll = sanSeriesCorrectEach.join('-').indexOf(presentSanSeries.join('-'));
    // 처음 움직임부터 동일해야 한다
    if (indexIncludingAll === 0) {
      return true;
    } else {
      return false;
    }
  });

  return remainingCorrectSanSeriesList[0];
}
