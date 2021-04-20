


export type QuizPresent = {
  idGame: string | null;
  mode: 'creating' | "editing" | "playing" | "solved" ;
  fen: string | null;
  turn: "white" | "black";
  seriesSan: string[];
}

export type ModeQuiz = 'playing' | 'solved' | 'creating' | 'editing';