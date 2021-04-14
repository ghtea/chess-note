import { ChessInstance, Move, Square } from 'chess.js'
const ChessReq:any = require('chess.js');
// https://stackoverflow.com/questions/58598457/not-a-constructor-error-with-library-and-angular
// const Chess:ChessInstance = new ChessReq();


const chess: ChessInstance = new ChessReq();


export default chess;