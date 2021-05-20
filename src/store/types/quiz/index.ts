import { ChessMoveNode } from '../others/ChessMoveTree';

export type MemberReaction = {
  likedMemberIdList: string[];
  dislikedMemberIdList: string[];
};

export type Quiz = {
  id: string | null;
  name: string;
  nextTurn: 'white' | 'black';
  startingFen: string;
  correctSanSeriesList: string[][];
  markedSanSeriesList: string[][];
  authorId: string;
  authorName: string;
  isPublic: boolean;
  memberReaction: MemberReaction;
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
  authorId
  authorName
  isPublic
  memberReaction
  createdDate
  updatedDate
}`;




export type Situation = null | 'creating' | 'editing' | 'playing-trying' | 'playing-solved' | 'playing-failed';

export type QuizState = {
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