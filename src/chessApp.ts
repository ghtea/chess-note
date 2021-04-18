import { ChessInstance, Move, Square } from 'chess.js'
import NodeMove from 'store/types/data/TreeNode';
const ChessReq:any = require('chess.js');
// https://stackoverflow.com/questions/58598457/not-a-constructor-error-with-library-and-angular
// const Chess:ChessInstance = new ChessReq();


const chess: ChessInstance = new ChessReq();

const nodeMoveRoot = new NodeMove({
  san: null,
  depth:number;
  turn: 'white' | 'black';
  listSanMoveBefore: string[];
  nodeMoveBefore: NodeMove | null;
})

export default chess;