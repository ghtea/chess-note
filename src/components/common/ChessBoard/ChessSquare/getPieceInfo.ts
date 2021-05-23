import {  PieceType } from 'chess.js';

import srcImgWhitePawn from 'others/images/chess/pawn-w.png';
import srcImgBlackPawn from 'others/images/chess/pawn-b.png';
import srcImgWhiteKnight from 'others/images/chess/knight-w.png';
import srcImgBlackKnight from 'others/images/chess/knight-b.png';
import srcImgWhiteBishop from 'others/images/chess/bishop-w.png';
import srcImgBlackBishop from 'others/images/chess/bishop-b.png';
import srcImgWhiteRook from 'others/images/chess/rook-w.png';
import srcImgBlackRook from 'others/images/chess/rook-b.png';
import srcImgWhiteQueen from 'others/images/chess/queen-w.png';
import srcImgBlackQueen from 'others/images/chess/queen-b.png';
import srcImgWhiteKing from 'others/images/chess/king-w.png';
import srcImgBlackKing from 'others/images/chess/king-b.png';

export default function getPieceInfo(
  piece: {
    type: PieceType;
    color: 'b' | 'w';
  } | null,
) {
  let src: string | undefined = undefined;
  let alt = '';

  if (!piece) {
  } else if (piece.type === 'p') {
    if (piece.color === 'w') {
      src = srcImgWhitePawn;
      alt = 'white pawn';
    } else {
      src = srcImgBlackPawn;
      alt = 'black pawn';
    }
  } else if (piece.type === 'n') {
    if (piece.color === 'w') {
      src = srcImgWhiteKnight;
      alt = 'white knight';
    } else {
      src = srcImgBlackKnight;
      alt = 'black knight';
    }
  } else if (piece.type === 'b') {
    if (piece.color === 'w') {
      src = srcImgWhiteBishop;
      alt = 'white bishop';
    } else {
      src = srcImgBlackBishop;
      alt = 'black bishop';
    }
  } else if (piece.type === 'r') {
    if (piece.color === 'w') {
      src = srcImgWhiteRook;
      alt = 'white rook';
    } else {
      src = srcImgBlackRook;
      alt = 'black rook';
    }
  } else if (piece.type === 'q') {
    if (piece.color === 'w') {
      src = srcImgWhiteQueen;
      alt = 'white queen';
    } else {
      src = srcImgBlackQueen;
      alt = 'black queen';
    }
  } else if (piece.type === 'k') {
    if (piece.color === 'w') {
      src = srcImgWhiteKing;
      alt = 'white king';
    } else {
      src = srcImgBlackKing;
      alt = 'black king';
    }
  }

  return { src, alt };
}
