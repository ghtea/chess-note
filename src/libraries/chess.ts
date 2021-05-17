import * as ChessJs from 'chess.js';
// https://stackoverflow.com/a/65243150/11681543

const Chess = typeof ChessJs === 'function' ? ChessJs : ChessJs.Chess;
const chess: ChessJs.ChessInstance = new Chess();


export default chess;
