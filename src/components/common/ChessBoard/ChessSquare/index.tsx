import React, { useCallback, useEffect, useMemo, useState } from 'react';
import history from 'libraries/history';

import { FormattedMessage } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import {  PieceType } from 'chess.js';

// https://github.com/STRML/react-draggable

//import IconPawn from 'svgs/chess/PiecePawn';



import * as actions from 'store/actions';
import * as types from 'store/types';

import styles from './index.module.scss';
import getPieceInfo from './getPieceInfo';
// import IconSort from 'svgs/basic/IconSort';

type PropsChessSquare = {
  piece: {
    type: PieceType;
    color: 'b' | 'w';
  } | null;
  position: {
    rank: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
    file: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
  };
  color: 'light' | 'dark';
  focused: boolean;

  firstClickedPosition: string | null;
  setFirstClickedPosition: React.Dispatch<React.SetStateAction<string | null>>;

  situation: string;
  page: string;
};

function ChessSquare({
  piece,
  position,
  color,
  focused,
  firstClickedPosition,
  setFirstClickedPosition,
  situation,
  page,
}: PropsChessSquare) {
  const dispatch = useDispatch();

  const { src, alt } = useMemo(() => getPieceInfo(piece), [piece]);

  const onClick_ChessSquare = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, firstClickedPosition: string | null) => {
      const elementUsing = event.currentTarget as HTMLDivElement;

      const position = (elementUsing.dataset['file'] || '') + (elementUsing.dataset['rank'] || '');
      // when first clicking to choose pice to move
      if (firstClickedPosition === null) {
        setFirstClickedPosition(position);
      }
      // when clicking to move
      else {
        //console.log('mode: ', mode)
        if (page === 'quiz') {
          if (situation === 'creating' || situation === 'editing') {
            dispatch(
              actions.quiz.return__MOVE_WHILE_EDITING_QUIZ({
                from: firstClickedPosition,
                to: position,
              }),
            );
          } else if (
            situation === 'playing-trying' ||
            situation === 'playing-failed' ||
            situation === 'playing-solved'
          ) {
            dispatch(
              actions.quiz.return__MOVE_IN_QUIZ_PLAYING({
                from: firstClickedPosition,
                to: position,
              }),
            );
          }
        }
        setFirstClickedPosition(null);
      }
    },
    [page, situation], 
  );

  return (
    <div
      className={`${styles['root']} color----${color} focused----${focused}`}
      data-file={position.file}
      data-rank={position.rank}
      data-level={'square'}
      onClick={(e)=>onClick_ChessSquare(e, firstClickedPosition)}
    >
      {!piece ? null : (
        <button
          className={`${styles['piece']} piece-${piece.type}`}
          data-level={'piece'}
          aria-label={alt}
        >
          <img className={`piece-${piece.type}`} src={src} alt={alt}></img>
        </button>
      )}
    </div>
  );
}

ChessSquare.defaultProps = {};

export default ChessSquare;
