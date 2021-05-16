import React, { useCallback, useEffect, useMemo, useState } from 'react';
import history from 'libraries/history';

import { FormattedMessage } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { StateRoot } from 'store/reducers';

// https://github.com/STRML/react-draggable

//import IconGraph from 'svgs/basic/IconChartBar';

import * as actions from 'store/actions';
import * as types from 'store/types';

import styles from './index.module.scss';
import ChessSquare from './ChessSquare';
// import IconSort from 'svgs/basic/IconSort';
// import {Chess} from 'chess.js'; // => makes error
import { ChessInstance, Move, PieceType, Square } from 'chess.js';

type PropsChessBoard = {
  //fen: string;
  listSquare: ({
    type: PieceType;
    color: 'b' | 'w';
  } | null)[][];

  side: 'white' | 'black';

  page: 'quiz' | 'opening';
};

function ChessBoard({ listSquare, side, page }: PropsChessBoard) {
  const dispatch = useDispatch();

  const situationQuiz = useSelector((state: StateRoot) => state.present.quiz.focusing.situation);

  const situation = useMemo(() => {
    // console.log('modeQuiz: ', situationQuiz)
    if (page === 'quiz') {
      return situationQuiz;
    } else {
      return 'opening';
    }
  }, [page, situationQuiz]);

  const { width: widthWindow, height: heightWindow } = useSelector(
    (state: StateRoot) => state.appearance.layout.window,
  );

  const heightHeader = useSelector(
    (state: StateRoot) => state.appearance.layout.document.header.height,
  );
  const heightStatusBar = useSelector(
    (state: StateRoot) => state.appearance.layout.document.chessBoard.statusBar.height,
  );
  const heightToolBar = useSelector(
    (state: StateRoot) => state.appearance.layout.document.chessBoard.toolBar.height,
  );

  const lengthChessBoard = useSelector(
    (state: StateRoot) => state.appearance.layout.document.chessBoard.length,
  );

  useEffect(() => {
    // height
    let lengthChessBoardNew = heightWindow - heightHeader - heightStatusBar - heightToolBar;
    if (lengthChessBoardNew > 700) {
      lengthChessBoardNew = 700;
    }
    if (widthWindow < lengthChessBoardNew) {
      lengthChessBoardNew = widthWindow;
    }
    dispatch(
      actions.appearance.return__REPLACE({
        keyList: ['layout', 'document', 'chessBoard', 'length'],
        replacement: lengthChessBoardNew,
      }),
    );
    // $device-xs__min-width: 320px;
    // $device-s__min-width: 576px;
    // $device-m__min-width: 768px;
    // $device-l__min-width: 992px;
  }, [widthWindow, heightWindow, heightHeader, heightToolBar]);

  useEffect(() => {
    const chessBoard = document.getElementsByClassName('ChessBoard')[0];

    dispatch(
      actions.appearance.return__REPLACE({
        keyList: ['layout', 'document', 'chessBoard', 'top'],
        replacement: chessBoard.getBoundingClientRect().top,
      }),
    );
  }, [lengthChessBoard]);

  const [positionStart, setPositionStart] = useState<null | string>(null);

  const onClick_Board = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, positionStart: string | null) => {
      // because of event delegation
      let elementUsing = event.target as HTMLDivElement | HTMLImageElement;
      while (!elementUsing.dataset || elementUsing.dataset['level'] !== 'square') {
        elementUsing = elementUsing.parentElement as HTMLDivElement | HTMLImageElement;
      }
      const position = (elementUsing.dataset['file'] || '') + (elementUsing.dataset['rank'] || '');
      // when first clicking to choose pice to move
      if (positionStart === null) {
        setPositionStart(position);
      }
      // when clicking to move
      else {
        //console.log('mode: ', mode)
        if (page === 'quiz') {
          if (situation === 'creating' || situation === 'editing') {
            dispatch(
              actions.data.quiz.return__MOVE_IN_QUIZ_EDITING({
                from: positionStart,
                to: position,
              }),
            );
          } else if (situation === 'playing' || situation === 'failed' || situation === 'solved') {
            dispatch(
              actions.data.quiz.return__MOVE_IN_QUIZ_PLAYING({
                from: positionStart,
                to: position,
              }),
            );
          }
        }
        setPositionStart(null);
      }
    },
    [page, situation, positionStart], // move 같은 함수도 잊지 말고 dependency list 에 추가!
  );

  // Junhyeon
  // 8 => 13 => 6.5

  const listSquareForCurrentSide = useMemo(() => {
    //console.log(listSquare)
    if (side === 'white') {
      //console.log(listSquare)
      return listSquare;
    } else {
      const listSquareNew = [...listSquare].reverse().map((e) => [...e].reverse());
      //console.log(listSquareNew)
      return listSquareNew;
    }
  }, [listSquare, side]);

  const { stringRank, stringFile, standardLight } = useMemo(() => {
    const stringRank = '87654321';
    const stringFile = 'abcdefgh';
    const standardLight = side === 'white' ? 0 : 1;

    return { stringRank, stringFile, standardLight };
  }, [side]);

  return (
    <div
      className={`${styles['root']} ChessBoard`}
      onClick={(e) => onClick_Board(e, positionStart)}
      style={{ width: lengthChessBoard, height: lengthChessBoard }}
    >
      {listSquareForCurrentSide.map((row, iRow) =>
        row.map((e, iCol) => {
          const iRowNew = side === 'white' ? iRow : 7 - iRow;
          const iColNew = side === 'white' ? iCol : 7 - iCol;
          return (
            <ChessSquare
              piece={e}
              position={{
                rank: stringRank[iRowNew] as '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8',
                file: stringFile[iColNew] as 'a' | 'b' | 'g' | 'c' | 'd' | 'e' | 'f' | 'h',
              }}
              focused={stringFile[iColNew] + stringRank[iRowNew] === positionStart}
              color={(iRowNew + iColNew) % 2 === standardLight ? 'light' : 'dark'}
              key={`ChessSquare-${iRowNew}-${iColNew}`}
            />
          );
        }),
      )}
    </div>
  );
}

ChessBoard.defaultProps = {};

export default ChessBoard;
