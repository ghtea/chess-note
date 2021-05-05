
export type Situation = 'creating' | 'editing' | 'playing' | 'solved' | 'failed';

export type Quiz = {
  idGame: string | null;
  situation: Situation;
  fen: string | null;
  turn: "white" | "black";
  seriesSan: string[];
}



export type OptionSorting = {
  property: string; // 'points' | 'goals_diff' | 'goals_against' | 'goals_scored', 
  direction: 'ascending' | 'descending';
  isActive: boolean;
};

export type ModeDisplay = 'public-quiz' | 'my-quiz';