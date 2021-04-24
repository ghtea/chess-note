

export type SituationQuiz = 'creating' | 'editing' | 'playing' | 'solved' | 'failed';

export type QuizPresent = {
  idGame: string | null;
  situation: SituationQuiz;
  fen: string | null;
  turn: "white" | "black";
  seriesSan: string[];
}

