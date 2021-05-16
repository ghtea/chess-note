import * as ChessJs from 'chess.js';
// https://stackoverflow.com/a/65243150/11681543
import { TreeMove } from 'store/types/others/TreeMove';

const Chess = typeof ChessJs === 'function' ? ChessJs : ChessJs.Chess;
const chess: ChessJs.ChessInstance = new Chess();

export const treeMove = new TreeMove({ startingFen: '', nextTurn: 'white' });
// 데이터 베이스//
// treeMove 수정을 하면 잊지말고 매번 state.data.quiz.focusing 에도 적용해주기
// 리덕스 스토에서 startingFen가 먼저 수정되면 watchFenStartChange 로 항상 treeMove 에 변화 자동으로 준다

export default chess;
