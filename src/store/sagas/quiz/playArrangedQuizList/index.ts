import { call, select, put } from 'redux-saga/effects';

import history from 'libraries/history';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import focusingChess from 'libraries/chess';
import shuffleArray from 'tools/vanilla/suffleArray';

export default function* playArrangedQuizList(action: actions.quiz.type__PLAY_ARRANGED_QUIZ_LIST) {
  const arrangedQuizIdList: string[] = yield select(
    (state: RootState) => state.quiz.state.display.arrangedIdList,
  );
  const quizList: types.quiz.Quiz[] = yield select((state: RootState) => state.quiz.data.list);

  if (!(quizList.length > 0) || !(arrangedQuizIdList.length > 0)) {
    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: 'PlayQuiz_NoQuiz__E',
      }),
    );
  } else {
    const newPlayingIdList = [...arrangedQuizIdList];
    shuffleArray(newPlayingIdList);

    yield put(
      actions.quiz.return__FOCUS_QUIZ({
        quiz: quizList.find((e) => e.id === newPlayingIdList[0]),
        situation: 'playing-trying',
      }),
    );

    yield put(
      actions.quiz.return__REPLACE({
        keyList: ['state', 'playingIdList'],
        replacement: newPlayingIdList,
      }),
    );
  }
}
