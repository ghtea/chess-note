import { call, spawn, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actions from 'store/actions';

import createQuiz from './manipulateQuiz/createQuiz';
import focusQuiz from './focusQuiz';
import getQuizById from './getQuizById';

import moveWhileEditingQuiz from './moveWhileEditingQuiz';
import moveWhilePlayingQuiz from './moveWhilePlayingQuiz';

import backToStart from './backToStart';
import backToPrevious from './backToPrevious';

import playArrangedQuizList from './playArrangedQuizList';
import playNextQuiz from './playNextQuiz';
import showAnswerOrMark from './showAnswerOrMark';
import watchSituationChange from './watchSituationChange';
import updateQuiz from './manipulateQuiz/updateQuiz';
import deleteQuiz from './manipulateQuiz/deleteQuiz';
import likeDislikeQuiz from './manipulateQuiz/likeDislikeQuiz';
import getQuizList from './getQuizList';
import changeStaringFen from './changeStartingFen';

export default function* quizSaga() {
  yield takeEvery(actions.quiz.name__FOCUS_QUIZ, focusQuiz);

  yield takeEvery(actions.quiz.name__CREATE_QUIZ, createQuiz);
  yield takeEvery(actions.quiz.name__UPDATE_QUIZ, updateQuiz);
  yield takeEvery(actions.quiz.name__DELETE_QUIZ, deleteQuiz);
  yield takeEvery(actions.quiz.name__LIKE_DISLIKE_QUIZ, likeDislikeQuiz);

  yield takeEvery(actions.quiz.name__GET_QUIZ_BY_ID, getQuizById);
  yield takeEvery(actions.quiz.name__GET_QUIZ_LIST, getQuizList);

  yield takeEvery(actions.quiz.name__MOVE_WHILE_EDITING_QUIZ, moveWhileEditingQuiz);
  yield takeEvery(actions.quiz.name__MOVE_IN_QUIZ_PLAYING, moveWhilePlayingQuiz);

  yield takeEvery(actions.quiz.name__BACK_TO_START, backToStart);
  yield takeEvery(actions.quiz.name__BACK_TO_PREVIOUS, backToPrevious);

  yield takeEvery(actions.quiz.name__CHANGE_STARTING_FEN, changeStaringFen);

  // yield takeEvery(actions.quiz.name__WATCH_STARTING_FEN_CHANGE, watchStartingFen);

  yield takeEvery(actions.quiz.name__PLAY_ARRANGED_QUIZ_LIST, playArrangedQuizList);
  yield takeEvery(actions.quiz.name__PLAY_NEXT_QUIZ, playNextQuiz);

  yield takeEvery(actions.quiz.name__SHOW_ANSWER_OR_MARK, showAnswerOrMark);
  yield takeEvery(actions.quiz.name__WATCH_SITUATION_CHANGE, watchSituationChange);
}
