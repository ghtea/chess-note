import NodeMove from "./NodeMove";



export enum KindGetListQuiz {
  publicQuiz = 'public-quiz',
  publicQuizByRecord = 'public-quiz-by-record',
  myQuizByRecord = 'my-quiz-by-record',
}


export type Quiz = {
  id: string | null;
  name: string;
  side: 'white' | 'black';
  fenStart: string;
  listNodeMoveNextCorrect: NodeMove[];
  idUser: string;
  isPublic: boolean;
}
