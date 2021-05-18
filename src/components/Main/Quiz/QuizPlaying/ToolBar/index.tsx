import React, { useCallback, useEffect, useMemo, useState } from 'react';
import history from 'libraries/history';
import * as clipboardy from 'clipboardy';
import { FormattedMessage } from 'react-intl';
import focusingChess from 'libraries/chess';

import { useSelector, useDispatch } from 'react-redux';
import { StateRoot } from 'store/reducers';

// https://github.com/STRML/react-draggable

//import IconGraph from 'svgs/basic/IconChartBar';

import * as actions from 'store/actions';
import * as types from 'store/types';

import styles from './index.module.scss';
import IconPaste from 'svgs/basic/IconSignIn';
import IconOthers from 'svgs/basic/IconThreeDots';

import IconBackToStart from 'svgs/basic/IconAngleDouble';
import IconBackOneMove from 'svgs/basic/IconAngle';

import IconBookSpell from 'svgs/basic/IconBookSpell';
import IconArrowInSquare from 'svgs/basic/IconArrowInSquare';
// import {Chess} from 'chess.js'; // => makes error

export default function ToolBarQP() {
  const dispatch = useDispatch();

  const heightToolbar = useSelector(
    (state: StateRoot) => state.appearance.layout.document.chessBoard.toolBar.height,
  );
  const lengthChessBoard = useSelector(
    (state: StateRoot) => state.appearance.layout.document.chessBoard.length,
  );

  const situation = useSelector((state: StateRoot) => state.quiz.state.situation);

  // const [positionStart, setPositionStart] = useState<null | string>(null);
  // const onClick_ControlPaste = useCallback(
  //     async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
  //         try {
  //             const value = await clipboardy.read();
  //             //console.log(value)
  //             loadFen(value)
  //         }
  //         catch (e){

  //         }
  // }, []);

  const onClick_Main = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = e.currentTarget.value;
    if (value === 'back-to-start') {
      dispatch(actions.quiz.return__BACK_TO_START());
    } else if (value === 'back-to-previous') {
      dispatch(actions.quiz.return__BACK_TO_PREVIOUS());
    } else if (value === 'save') {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', 'quizEditingSave'],
          replacement: true,
        }),
      );
    } else if (value === 'others') {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', 'quizEditingOthers'],
          replacement: true,
        }),
      );
    }
  }, []);

  return (
    <div
      className={`${styles['root']}`}
      style={{
        width: lengthChessBoard,
        height: heightToolbar,
      }}
    >
      <div className={`${styles['back']}`}>
        <button
          type="button"
          value="back-to-start"
          aria-label="back to start"
          onClick={onClick_Main}
        >
          <IconBackToStart
            className={`${styles['icon__back-to-start']}`}
            kind="regular"
            direction="left"
          />
        </button>

        <button
          type="button"
          value="back-to-previous"
          aria-label="Back to Previous"
          onClick={onClick_Main}
        >
          <IconBackOneMove
            className={`${styles['icon__back-to-previous']}`}
            kind="regular"
            direction="left"
          />
        </button>
      </div>

      <div className={`${styles['...']}`}></div>

      <div className={`${styles['show-answer']}`}>
        <button type="button" value="show-answer" aria-label="show answer" onClick={onClick_Main}>
          <IconBookSpell className={`${styles['icon__show-answer']}`} kind="regular" />
        </button>
      </div>

      <div className={`${styles['...']}`}></div>

      <div className={`${styles['another-quiz']}`}>
        {(situation === 'playing-solved' || situation === 'playing-failed') && (
          <button
            type="button"
            value="another-quiz"
            aria-label="another quiz"
            onClick={onClick_Main}
          >
            <IconArrowInSquare
              className={`${styles['icon__another-quiz']}`}
              kind="solid"
              direction="right"
            />
          </button>
        )}
      </div>
    </div>
  );
}
