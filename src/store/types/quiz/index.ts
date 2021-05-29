import { ChessMoveNode } from '../others/ChessMoveTree';

export type MemberReaction = {
  likedMemberIdList: string[];
  dislikedMemberIdList: string[];
};


export type Quiz = {
  id: string;
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
  memberReaction {
    likedMemberIdList
    dislikedMemberIdList
  }
  createdDate
  updatedDate
}`;


export const defaultFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export type Situation = '' | 'creating' | 'editing' | 'playing-trying' | 'playing-solved' | 'playing-failed';

export type QuizState = {
  fen: string;
  turn: 'white' | 'black';
  sanSeries: string[];
};


export type FilteringOption = 'my-quiz' | 'public-quiz' | 'i-liked' | 'i-disliked' | 'not-decided' | 'i-solved' | 'i-failed' | 'not-tried';
export type SortingOption = {
  property: 'name-id' | 'createdDate' | 'triedDate' | 'author' | 'likes';
  direction: 'ascending' | 'descending';
  isActive: boolean;
};