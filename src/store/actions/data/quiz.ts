import * as types from 'store/types';
import { ChessMoveNode } from 'store/types/others/ChessMoveTree';
import { KindGetFocusListQuiz } from 'store/types/data/quiz';

export const name__MOVE_WHILE_EDITING_QUIZ = 'data/quiz/MOVE_WHILE_EDITING_QUIZ';
type Payload__MOVE_WHILE_EDITING_QUIZ = {
  from?: string;
  to?: string;
  san?: string;
};
export const return__MOVE_WHILE_EDITING_QUIZ = (payload: Payload__MOVE_WHILE_EDITING_QUIZ) => {
  return {
    type: name__MOVE_WHILE_EDITING_QUIZ,
    payload: payload,
  };
};
export type type__MOVE_WHILE_EDITING_QUIZ = ReturnType<typeof return__MOVE_WHILE_EDITING_QUIZ>;

export const name__MOVE_IN_QUIZ_PLAYING = 'data/quiz/MOVE_IN_QUIZ_PLAYING';
type Payload__MOVE_IN_QUIZ_PLAYING = {
  from?: string;
  to?: string;
  san?: string;
};
export const return__MOVE_IN_QUIZ_PLAYING = (payload: Payload__MOVE_IN_QUIZ_PLAYING) => {
  return {
    type: name__MOVE_IN_QUIZ_PLAYING,
    payload: payload,
  };
};
export type type__MOVE_IN_QUIZ_PLAYING = ReturnType<typeof return__MOVE_IN_QUIZ_PLAYING>;

export const name__BACK_TO_START = 'data/quiz/BACK_TO_START';
export const return__BACK_TO_START = () => {
  return {
    type: name__BACK_TO_START,
  };
};
export type type__BACK_TO_START = ReturnType<typeof return__BACK_TO_START>;

export const name__BACK_TO_PREVIOUS = 'data/quiz/BACK_TO_PREVIOUS';
export const return__BACK_TO_PREVIOUS = () => {
  return {
    type: name__BACK_TO_PREVIOUS,
  };
};
export type type__BACK_TO_PREVIOUS = ReturnType<typeof return__BACK_TO_PREVIOUS>;

export const name__FOCUS_QUIZ = 'data/quiz/FOCUS_QUIZ';
type Payload__FOCUS_QUIZ = {
  quiz?: types.data.quiz.Quiz;
  situation: types.present.quiz.Situation;
};
export const return__FOCUS_QUIZ = (payload: Payload__FOCUS_QUIZ) => {
  return {
    type: name__FOCUS_QUIZ,
    payload: payload,
  };
};
export type type__FOCUS_QUIZ = ReturnType<typeof return__FOCUS_QUIZ>;

export const name__GET_LIST_QUIZ = 'data/quiz/GET_LIST_QUIZ';
type Payload__GET_LIST_QUIZ = {
  userId?: string;
};
export const return__GET_LIST_QUIZ = (payload: Payload__GET_LIST_QUIZ) => {
  return {
    type: name__GET_LIST_QUIZ,
    payload: payload,
  };
};
export type type__GET_LIST_QUIZ = ReturnType<typeof return__GET_LIST_QUIZ>;

export const name__GET_QUIZ_BY_ID = 'data/quiz/GET_QUIZ_BY_ID';
type Payload__GET_QUIZ_BY_ID = {
  quizId: string;
  userIdInApp?: string;
  situation: types.present.quiz.Situation;
};
export const return__GET_QUIZ_BY_ID = (payload: Payload__GET_QUIZ_BY_ID) => {
  return {
    type: name__GET_QUIZ_BY_ID,
    payload: payload,
  };
};
export type type__GET_QUIZ_BY_ID = ReturnType<typeof return__GET_QUIZ_BY_ID>;

export const name__GET_QUIZ_LIST_DICT = 'data/quiz/GET_QUIZ_LIST_DICT';
type Payload__GET_QUIZ_LIST_DICT = {
  userId?: string;
};
export const return__GET_QUIZ_LIST_DICT = (payload: Payload__GET_QUIZ_LIST_DICT) => {
  return {
    type: name__GET_QUIZ_LIST_DICT,
    payload: payload,
  };
};
export type type__GET_QUIZ_LIST_DICT = ReturnType<typeof return__GET_QUIZ_LIST_DICT>;

export const name__CREATE_QUIZ = 'data/quiz/CREATE_QUIZ';
type Payload__CREATE_QUIZ = {
  name?: string;
  nextTurn: 'white' | 'black';
  startingFen: string;
  correctSanSeriesList: string[][];
  markedSanSeriesList: string[][];
  userId: string;
  isPublic: boolean;
};
export const return__CREATE_QUIZ = (payload: Payload__CREATE_QUIZ) => {
  return {
    type: name__CREATE_QUIZ,
    payload: payload,
  };
};
export type type__CREATE_QUIZ = ReturnType<typeof return__CREATE_QUIZ>;

export const name__UPDATE_QUIZ = 'data/quiz/UPDATE_QUIZ';
type Payload__UPDATE_QUIZ = {
  name?: string;
  nextTurn: 'white' | 'black';
  startingFen: string;
  correctSanSeriesList: string[][];
  markedSanSeriesList: string[][];
  userId: string;
  isPublic: boolean;
};
export const return__UPDATE_QUIZ = (payload: Payload__UPDATE_QUIZ) => {
  return {
    type: name__UPDATE_QUIZ,
    payload: payload,
  };
};
export type type__UPDATE_QUIZ = ReturnType<typeof return__UPDATE_QUIZ>;

export const name__WATCH_STARTING_FEN_CHANGE = 'data/quiz/WATCH_STARTING_FEN_CHANGE';
export const return__WATCH_STARTING_FEN_CHANGE = () => {
  return {
    type: name__WATCH_STARTING_FEN_CHANGE,
  };
};
export type type__WATCH_STARTING_FEN_CHANGE = ReturnType<typeof return__WATCH_STARTING_FEN_CHANGE>;
