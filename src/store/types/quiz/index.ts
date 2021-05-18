import { ChessMoveNode } from '../others/ChessMoveTree';


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

// export type ModeQuiz = 'playing' | 'solved' | 'creating' | 'editing';

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




export type Situation = null | 'creating' | 'editing' | 'playing-trying' | 'playing-solved' | 'playing-failed';

export type QuizState = {
  id: string | null;
  fen: string | null;
  turn: 'white' | 'black';
  sanSeries: string[];
};

export type DisplayMode = 'public-quiz' | 'my-quiz';

export type SortingOption = {
  property: string; // 'points' | 'goals_diff' | 'goals_against' | 'goals_scored',
  direction: 'ascending' | 'descending';
  isActive: boolean;
};