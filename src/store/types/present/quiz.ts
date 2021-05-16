export type Situation = 'creating' | 'editing' | 'playing' | 'solved' | 'failed';

export type Quiz = {
  id: string | null;
  situation: Situation;
  fen: string | null;
  turn: 'white' | 'black';
  sanSeries: string[];
};

export type SortingOption = {
  property: string; // 'points' | 'goals_diff' | 'goals_against' | 'goals_scored',
  direction: 'ascending' | 'descending';
  isActive: boolean;
};

export type DisplayMode = 'public-quiz' | 'my-quiz';
