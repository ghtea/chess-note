import { call, select, put } from 'redux-saga/effects';

import history from 'libraries/history';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import focusingChess from 'libraries/chess';
import shuffleArray from 'tools/vanilla/suffleArray';

export default function* playRandomQuiz(action: actions.quiz.type__PLAY_RANDOM_QUIZ) {

  const {kind} = action.payload;

  const quizList: types.quiz.Quiz[] = yield select(
    (state: StateRoot) => state.quiz.data[kind === 'public-quiz' ? 'publicQuizList' : 'myQuizList'],
  );

  if (!(quizList.length > 0)) {
    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        codeSituation: kind === 'public-quiz' ? 'PlayQuiz_NoPublicQuiz__E' : 'PlayQuiz_NoMyQuiz__E',
      }),
    );
  } else {
    const newPlayingIdList = [...quizList.map((e) => e.id)];
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
