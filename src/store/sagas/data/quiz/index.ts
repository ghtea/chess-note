import { call, spawn, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actions from 'store/actions';

import createQuiz from './createQuiz';
import focusQuiz from './focusQuiz';
import getQuizById from './getQuizById';
import getQuizListDict from './getQuizListDict';

import moveInQuizEditing from './moveInQuizEditing';
import moveInQuizPlaying from './moveInQuizPlaying';

import backToStart from './backToStart';

import watchStartingFen from './watchStartingFen';

export default function* sagaQuiz() {
  yield takeEvery(actions.data.quiz.name__FOCUS_QUIZ, focusQuiz);

  yield takeEvery(actions.data.quiz.name__CREATE_QUIZ, createQuiz);

  yield takeEvery(actions.data.quiz.name__GET_QUIZ_BY_ID, getQuizById);
  yield takeEvery(actions.data.quiz.name__GET_QUIZ_LIST_DICT, getQuizListDict);

  yield takeEvery(actions.data.quiz.name__MOVE_IN_QUIZ_EDITING, moveInQuizEditing);
  yield takeEvery(actions.data.quiz.name__MOVE_IN_QUIZ_PLAYING, moveInQuizPlaying);

  yield takeEvery(actions.data.quiz.name__BACK_TO_START, backToStart);

  yield takeLatest(actions.data.quiz.name__WATCH_STARTING_FEN_CHANGE, watchStartingFen);
}
