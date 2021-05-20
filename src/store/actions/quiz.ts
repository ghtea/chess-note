import * as types from 'store/types';
import { ChessMoveNode } from 'store/types/others/ChessMoveTree';

export const name__REPLACE = `quiz/REPLACE`; // 뒤에 as const 를 붙이면 reducer 에서 auth.REPLACE 로 쓸때 오류 뜬다. 아직 이해못
interface Payload__REPLACE {
  keyList: (string | number)[];
  replacement: unknown;
}
export const return__REPLACE = (payload: Payload__REPLACE) => {
  return {
    type: name__REPLACE,
    payload: payload,
  };
};
export type type__REPLACE = ReturnType<typeof return__REPLACE>; // 리덕스에서의 type, 타입스크립트에서의 type 헷갈림 주의!

export const name__MOVE_WHILE_EDITING_QUIZ = 'quiz/MOVE_WHILE_EDITING_QUIZ';
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

export const name__MOVE_IN_QUIZ_PLAYING = 'quiz/MOVE_IN_QUIZ_PLAYING';
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

export const name__BACK_TO_START = 'quiz/BACK_TO_START';
export const return__BACK_TO_START = () => {
  return {
    type: name__BACK_TO_START,
  };
};
export type type__BACK_TO_START = ReturnType<typeof return__BACK_TO_START>;

export const name__BACK_TO_PREVIOUS = 'quiz/BACK_TO_PREVIOUS';
export const return__BACK_TO_PREVIOUS = () => {
  return {
    type: name__BACK_TO_PREVIOUS,
  };
};
export type type__BACK_TO_PREVIOUS = ReturnType<typeof return__BACK_TO_PREVIOUS>;

export const name__FOCUS_QUIZ = 'quiz/FOCUS_QUIZ';
type Payload__FOCUS_QUIZ = {
  quiz?: types.quiz.Quiz;
  situation: types.quiz.Situation;
};
export const return__FOCUS_QUIZ = (payload: Payload__FOCUS_QUIZ) => {
  return {
    type: name__FOCUS_QUIZ,
    payload: payload,
  };
};
export type type__FOCUS_QUIZ = ReturnType<typeof return__FOCUS_QUIZ>;

export const name__GET_LIST_QUIZ = 'quiz/GET_LIST_QUIZ';
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

export const name__GET_QUIZ_BY_ID = 'quiz/GET_QUIZ_BY_ID';
type Payload__GET_QUIZ_BY_ID = {
  quizId: string;
  userIdInApp?: string;
  situation: types.quiz.Situation;
};
export const return__GET_QUIZ_BY_ID = (payload: Payload__GET_QUIZ_BY_ID) => {
  return {
    type: name__GET_QUIZ_BY_ID,
    payload: payload,
  };
};
export type type__GET_QUIZ_BY_ID = ReturnType<typeof return__GET_QUIZ_BY_ID>;

export const name__GET_QUIZ_LIST_DICT = 'quiz/GET_QUIZ_LIST_DICT';
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

// manipulate Quiz
export const name__CREATE_QUIZ = 'quiz/CREATE_QUIZ';
type Payload__CREATE_QUIZ = {
  name?: string;
  nextTurn: 'white' | 'black';
  startingFen: string;
  correctSanSeriesList: string[][];
  markedSanSeriesList: string[][];
  authorId: string;
  isPublic: boolean;
};
export const return__CREATE_QUIZ = (payload: Payload__CREATE_QUIZ) => {
  return {
    type: name__CREATE_QUIZ,
    payload: payload,
  };
};
export type type__CREATE_QUIZ = ReturnType<typeof return__CREATE_QUIZ>;

export const name__UPDATE_QUIZ = 'quiz/UPDATE_QUIZ';
type Payload__UPDATE_QUIZ = {
  id: string;
  name?: string;
  nextTurn: 'white' | 'black';
  startingFen: string;
  correctSanSeriesList: string[][];
  markedSanSeriesList: string[][];
  authorId: string;
  isPublic: boolean;
};
export const return__UPDATE_QUIZ = (payload: Payload__UPDATE_QUIZ) => {
  return {
    type: name__UPDATE_QUIZ,
    payload: payload,
  };
};
export type type__UPDATE_QUIZ = ReturnType<typeof return__UPDATE_QUIZ>;


export const name__DELETE_QUIZ = 'quiz/DELETE_QUIZ';
type Payload__DELETE_QUIZ = {
  id: string;
  userId: string;
};
export const return__DELETE_QUIZ = (payload: Payload__DELETE_QUIZ) => {
  return {
    type: name__DELETE_QUIZ,
    payload: payload,
  };
};
export type type__DELETE_QUIZ = ReturnType<typeof return__DELETE_QUIZ>;


// play
export const name__PLAY_RANDOM_QUIZ = 'quiz/PLAY_RANDOM_QUIZ';
type Payload__PLAY_RANDOM_QUIZ = {
  kind: 'my-quiz' | 'public-quiz';
};
export const return__PLAY_RANDOM_QUIZ = (payload: Payload__PLAY_RANDOM_QUIZ) => {
  return {
    type: name__PLAY_RANDOM_QUIZ,
    payload: payload,
  };
};
export type type__PLAY_RANDOM_QUIZ = ReturnType<typeof return__PLAY_RANDOM_QUIZ>;

export const name__PLAY_NEXT_QUIZ = 'quiz/PLAY_NEXT_QUIZ';
export const return__PLAY_NEXT_QUIZ = () => {
  return {
    type: name__PLAY_NEXT_QUIZ,
  };
};
export type type__PLAY_NEXT_QUIZ = ReturnType<typeof return__PLAY_NEXT_QUIZ>;

// manage answers, marks
export const name__SHOW_ANSWER_OR_MARK = 'quiz/SHOW_ANSWER_OR_MARK';
type Payload__SHOW_ANSWER_OR_MARK = {
  index: number;
  kind: 'answer' | 'mark';
};
export const return__SHOW_ANSWER_OR_MARK = (payload: Payload__SHOW_ANSWER_OR_MARK) => {
  return {
    type: name__SHOW_ANSWER_OR_MARK,
    payload: payload,
  };
};
export type type__SHOW_ANSWER_OR_MARK = ReturnType<typeof return__SHOW_ANSWER_OR_MARK>;


// watch state change
export const name__WATCH_STARTING_FEN_CHANGE = 'quiz/WATCH_STARTING_FEN_CHANGE';
export const return__WATCH_STARTING_FEN_CHANGE = () => {
  return {
    type: name__WATCH_STARTING_FEN_CHANGE,
  };
};
export type type__WATCH_STARTING_FEN_CHANGE = ReturnType<typeof return__WATCH_STARTING_FEN_CHANGE>;


export const name__WATCH_SITUATION_CHANGE = 'quiz/WATCH_SITUATION_CHANGE';
export const return__WATCH_SITUATION_CHANGE = () => {
  return {
    type: name__WATCH_SITUATION_CHANGE,
  };
};
export type type__WATCH_SITUATION_CHANGE = ReturnType<typeof return__WATCH_SITUATION_CHANGE>;
