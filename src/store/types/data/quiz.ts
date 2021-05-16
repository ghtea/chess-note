import {NodeMove} from "../others/TreeMove";



export enum KindGetFocusListQuiz {
  publicQuiz = 'public-quiz',
  publicQuizByRecord = 'public-quiz-by-record',
  myQuizByRecord = 'my-quiz-by-record',
}


export type Quiz = {
  id: string | null;
  name: string;
  turnNext: 'white' | 'black';
  fenStart: string;
  listSeriesSanCorrect: string[][];
  listSeriesSanMention: string[][];
  idUser: string;
  isPublic: boolean;
  dateCreated?: number;
  dateUpdated?: number;
}

export type ModeQuiz = 'playing' | 'solved' | 'creating' | 'editing';


export const stringGqlQuiz = `{
  id
  name
  turnNext
  fenStart
  listSeriesSanCorrect
  listSeriesSanMention
  idUser
  isPublic
  dateCreated
  dateUpdated
}`;