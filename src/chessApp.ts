import { ChessInstance, Move, Square } from 'chess.js'
import {TreeMove, } from 'store/types/others/TreeMove';
const ChessReq:any = require('chess.js');
// https://stackoverflow.com/questions/58598457/not-a-constructor-error-with-library-and-angular
// const Chess:ChessInstance = new ChessReq();


const chess: ChessInstance = new ChessReq();


export const treeMove = new TreeMove({fenStart: '', turnNext: 'white'});
// 데이터 베이스//
// treeMove 수정을 하면 잊지말고 매번 state.data.quiz.focusing 에도 적용해주기
// 리덕스 스토에서 fenStart가 먼저 수정되면 watchFenStartChange 로 항상 treeMove 에 변화 자동으로 준다

export default chess;