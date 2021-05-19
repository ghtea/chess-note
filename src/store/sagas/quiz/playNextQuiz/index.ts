import { call, select, put } from 'redux-saga/effects';

import history from 'libraries/history';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import focusingChess from 'libraries/chess';
import shuffleArray from 'tools/vanilla/suffleArray';

export default function* playNextQuiz(action: actions.quiz.type__PLAY_NEXT_QUIZ) {
  const focusingId: string = yield select((state: RootState) => state.quiz.data.focusing.id);

  const playingIdList: string[] = yield select(
    (state: RootState) => state.quiz.state.playingIdList,
  );

  const currentIndex = playingIdList.findIndex((e) => e === focusingId);
  //console.log(currentIndex, focusingId, playingIdList)
  if (currentIndex === -1) {
    console.log('there is not this quiz in playingIdList');
  } else if (currentIndex === playingIdList.length - 1) {
    console.log('no more quiz');
  } else {
    const myQuizList: types.quiz.Quiz[] = yield select(
      (state: RootState) => state.quiz.data.myQuizList,
    );
    const publicQuizList: types.quiz.Quiz[] = yield select(
      (state: RootState) => state.quiz.data.publicQuizList,
    );

    yield put(
      actions.quiz.return__FOCUS_QUIZ({
        quiz: [...myQuizList, ...publicQuizList].find(
          (e) => e.id === playingIdList[currentIndex + 1],
        ),
        situation: 'playing-trying',
      }),
    );
  }
}
