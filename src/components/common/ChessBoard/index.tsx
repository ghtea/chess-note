import React, { useCallback, useEffect, useMemo, useState } from 'react';
import history from 'libraries/history';

import { FormattedMessage } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';

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

  const quizSituation = useSelector((state: RootState) => state.quiz.state.situation);

  const situation = useMemo(() => {
    // console.log('modeQuiz: ', situationQuiz)
    if (page === 'quiz') {
      return quizSituation;
    } else {
      return 'opening';
    }
  }, [page, quizSituation]);

  const { width: widthWindow, height: heightWindow } = useSelector(
    (state: RootState) => state.appearance.layout.window,
  );

  const heightHeader = useSelector(
    (state: RootState) => state.appearance.layout.document.header.height,
  );
  const heightStatusBar = useSelector(
    (state: RootState) => state.appearance.layout.document.entireBoard.statusBar.height,
  );
  const heightToolBar = useSelector(
    (state: RootState) => state.appearance.layout.document.entireBoard.toolBar.height,
  );

  const chessBoardLength = useSelector(
    (state: RootState) => state.appearance.layout.document.entireBoard.chessBoard.length,
  );

  useEffect(() => {
    // height
    let newChessBoardLength = heightWindow - heightHeader - heightStatusBar - heightToolBar;
    if (newChessBoardLength > 700) {
      newChessBoardLength = 700;
    }
    if (widthWindow < newChessBoardLength) {
      newChessBoardLength = widthWindow;
    }
    dispatch(
      actions.appearance.return__REPLACE({
        keyList: ['layout', 'document', 'entireBoard', 'chessBoard', 'length'],
        replacement: newChessBoardLength,
      }),
    );
    // $device-xs__min-width: 320px;
    // $device-s__min-width: 576px;
    // $device-m__min-width: 768px;
    // $device-l__min-width: 992px;
  }, [widthWindow, heightWindow, heightHeader, heightToolBar]);

  useEffect(() => {
    const chessBoard = document.getElementsByClassName('ChessBoard')[0];

    const newChessBoardPosition= {
      x: chessBoard.getBoundingClientRect().x,
      y: chessBoard.getBoundingClientRect().y,
    }
    dispatch(
      actions.appearance.return__REPLACE({
        keyList: ['layout', 'document', 'entireBoard', 'chessBoard', 'position'],
        replacement: newChessBoardPosition,
      }),
    );
  }, [chessBoardLength, widthWindow, heightWindow]);

  const [firstClickedPosition, setFirstClickedPosition] = useState<null | string>(null);


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
      style={{ width: chessBoardLength, height: chessBoardLength }}
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
              focused={stringFile[iColNew] + stringRank[iRowNew] === firstClickedPosition}
              color={(iRowNew + iColNew) % 2 === standardLight ? 'light' : 'dark'}

              firstClickedPosition = {firstClickedPosition}
              setFirstClickedPosition = {setFirstClickedPosition}

              situation={situation}
              page={page}

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
