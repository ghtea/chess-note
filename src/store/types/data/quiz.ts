import { NodeMove } from '../others/TreeMove';

export enum KindGetFocusListQuiz {
  publicQuiz = 'public-quiz',
  publicQuizByRecord = 'public-quiz-by-record',
  myQuizByRecord = 'my-quiz-by-record',
}

export type Quiz = {
  id: string | null;
  name: string;
  nextTurn: 'white' | 'black';
  startingFen: string;
  correctSanSeriesList: string[][];
  markedSanSeriesList: string[][];
  userId: string;
  isPublic: boolean;
  createdDate?: number;
  updatedDate?: number;
};

export type ModeQuiz = 'playing' | 'solved' | 'creating' | 'editing';

export const gqlQuizString = `{
  id
  name
  nextTurn
  startingFen
  correctSanSeriesList
  markedSanSeriesList
  userId
  isPublic
  createdDate
  updatedDate
}`;
