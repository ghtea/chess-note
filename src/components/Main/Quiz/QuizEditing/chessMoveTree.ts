import { ChessMoveTree } from 'store/types/others/ChessMoveTree';

export const correctChessMoveTree = new ChessMoveTree('');
// ?? chessMoveTree 수정을 하면 잊지말고 매번 state.data.quiz.focusing 에도 적용해주기
// (했음) 리덕스 스토에서 startingFen가 먼저 수정되면 watchFenStartChange 로 항상 chessMoveTree 에 변화 자동으로 준다

export const markedChessMoveTree = new ChessMoveTree('');
