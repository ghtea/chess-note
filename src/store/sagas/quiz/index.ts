import { call, spawn, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actions from 'store/actions';

import createQuiz from './createQuiz';
import focusQuiz from './focusQuiz';
import getQuizById from './getQuizById';
import getQuizListDict from './getQuizListDict';

import moveWhileEditingQuiz from './moveWhileEditingQuiz';
import moveWhilePlayingQuiz from './moveWhilePlayingQuiz';

import backToStart from './backToStart';
import backToPrevious from './backToPrevious';

import watchStartingFen from './watchStartingFen';
import playRandomQuiz from './playRandomQuiz/playRandomQuiz';

export default function* quizSaga() {
  yield takeEvery(actions.quiz.name__FOCUS_QUIZ, focusQuiz);

  yield takeEvery(actions.quiz.name__CREATE_QUIZ, createQuiz);

  yield takeEvery(actions.quiz.name__GET_QUIZ_BY_ID, getQuizById);
  yield takeEvery(actions.quiz.name__GET_QUIZ_LIST_DICT, getQuizListDict);

  yield takeEvery(actions.quiz.name__MOVE_WHILE_EDITING_QUIZ, moveWhileEditingQuiz);
  yield takeEvery(actions.quiz.name__MOVE_IN_QUIZ_PLAYING, moveWhilePlayingQuiz);

  yield takeEvery(actions.quiz.name__BACK_TO_START, backToStart);
  yield takeEvery(actions.quiz.name__BACK_TO_PREVIOUS, backToPrevious);

  yield takeLatest(actions.quiz.name__WATCH_STARTING_FEN_CHANGE, watchStartingFen);

  yield takeEvery(actions.quiz.name__PLAY_RANDOM_QUIZ, playRandomQuiz);

}
