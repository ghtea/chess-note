


export type QuizPresent = {
  idGame: string | null;
  mode: 'creating' | "editing" | "playing" | "solved" ;
  fen: string | null;
  turn: "white" | "black";
  listMove: string[];
  index: number;
}