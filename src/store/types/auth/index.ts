
export type User = {
  id: string;
  email: string;

  photoURL: string;
  displayName: string;

  joined: Date;
  accessed: Date;
};

export type QuizRecord = { date: number; quizId: string; result: boolean };

export type Member = {
  userId: string;
  quizRecordList: QuizRecord[];
};


export const gqlMemberString = `{
  id
  userId
  quizRecordList {
    date
    quizId
    result
  }
}`;