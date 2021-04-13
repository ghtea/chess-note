export type Record = {
  date: string;
  result: boolean;
}


export enum KindGetListQuiz {
  publicQuiz = 'public-quiz',
  publicQuizByRecord = 'public-quiz-by-record',
  myQuizByRecord = 'my-quiz-by-record',
}


export type Quiz = {
  id: string;
  name: string;
  side: 'white' | 'black';
  fenStart: string;
  listListMoveCorrect: string[][];
  idUser: string;
  isPublic: boolean;
}