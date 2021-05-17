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

import IconPaste from 'svgs/basic/IconSignIn';
import IconAngle from 'svgs/basic/IconAngle';
import IconOthers from 'svgs/basic/IconThreeDots';
// import {Chess} from 'chess.js'; // => makes error


export default function StatusBarQP() {
  const dispatch = useDispatch();

  const heightStatusBar = useSelector(
    (state: StateRoot) => state.appearance.layout.document.chessBoard.statusBar.height,
  );
  const lengthChessBoard = useSelector(
    (state: StateRoot) => state.appearance.layout.document.chessBoard.length,
  );

  const turn = useSelector((state: StateRoot) => state.present.quiz.focusing.turn);
  const situation = useSelector((state: StateRoot) => state.present.quiz.focusing.situation);

  const onClick_Main = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = e.currentTarget.value;
    // if (value === 'create'){
    //     dispatch(actions.appearance.return__REPLACE({
    //         keyList: ['showing', 'modal', 'quizEditingUpload'],
    //         replacement: true,
    //     }));
    // }
  }, []);

  return (
    <div
      className={`${styles['root']}`}
      style={{
        width: lengthChessBoard,
        height: heightStatusBar,
      }}
    >
      <div className={`${styles[`playing-${turn}`]}  ${styles[`${turn}`]}`}>
        {turn === 'white' ? (
          <FormattedMessage id="Global.WhiteToMove" />
        ) : (
          <FormattedMessage id="Global.BlackToMove" />
        )}
      </div>

      {situation === 'solved' && (
        <div className={`${styles['solved']}`}>
          <FormattedMessage id="Main.QuizPlay_StatusBar_Solved" />
        </div>
      )}

      {situation === 'failed' && (
        <div className={`${styles['failed']}`}>
          <FormattedMessage id="Main.QuizPlay_StatusBar_Failed" />
        </div>
      )}
    </div>
  );
}
