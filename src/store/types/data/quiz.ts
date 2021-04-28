import {NodeMove} from "./TreeMove";



export enum KindGetListQuiz {
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
}

export type ModeQuiz = 'playing' | 'solved' | 'creating' | 'editing';