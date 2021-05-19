
export type User = {
  id: string;
  email: string;

  photoURL: string;
  name: string; 

  joined: Date;
  accessed: Date;
};

export type QuizRecord = { date: number; quizId: string; result: boolean };

export type Member = {
  userId: string;
  userName: string;
  quizRecordList: QuizRecord[];
};


export const gqlMemberString = `{
  id
  userId
  userName
  quizRecordList {
    date
    quizId
    result
  }
}`;