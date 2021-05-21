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

import IconPaste from 'svgs/basic/IconSignIn';
import IconAngle from 'svgs/basic/IconAngle';
import IconOthers from 'svgs/basic/IconThreeDots';
// import {Chess} from 'chess.js'; // => makes error

export default function StatusBarQP() {
  const dispatch = useDispatch();

  const heightStatusBar = useSelector(
    (state: RootState) => state.appearance.layout.document.chessBoard.statusBar.height,
  );
  const chessBoardLength = useSelector(
    (state: RootState) => state.appearance.layout.document.chessBoard.length,
  );

  const turn = useSelector((state: RootState) => state.quiz.state.focusing.turn);
  const situation = useSelector((state: RootState) => state.quiz.state.situation);

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
        width: chessBoardLength,
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

      {situation === 'playing-solved' && (
        <div className={`${styles['solved']}`}>
          <FormattedMessage id="Main.QuizPlay_StatusBar_Solved" />
        </div>
      )}

      {situation === 'playing-failed' && (
        <div className={`${styles['failed']}`}>
          <FormattedMessage id="Main.QuizPlay_StatusBar_Failed" />
        </div>
      )}
    </div>
  );
}
