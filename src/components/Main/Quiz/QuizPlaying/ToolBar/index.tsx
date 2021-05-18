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

import IconAnswer from 'svgs/basic/IconCheckCircle';
import IconMark from 'svgs/basic/IconInfoCircle';

import IconBackToStart from 'svgs/basic/IconAngleDouble';
import IconBackOneMove from 'svgs/basic/IconAngle';

import IconArrowInSquare from 'svgs/basic/IconArrowInSquare';
import IconQuestionSquare from 'svgs/basic/IconQuestionSquare';
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

  const focusingId = useSelector((state: StateRoot) => state.quiz.data.focusing.id);
  const playingIdList = useSelector((state: StateRoot) => state.quiz.state.playingIdList);
  const focusingQuizData = useSelector((state: StateRoot) => state.quiz.data.focusing);

  const onClick_Main = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = e.currentTarget.value;
    if (value === 'back-to-start') {
      dispatch(actions.quiz.return__BACK_TO_START());
    } else if (value === 'back-to-previous') {
      dispatch(actions.quiz.return__BACK_TO_PREVIOUS());
    } else if (value === 'give-up') {
      dispatch(
        actions.quiz.return__REPLACE({
          keyList: ['state', 'situation'],
          replacement: 'playing-failed',
        }),
      );
    } else if (value === 'manage-answers') {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', 'quizManageAnswers'],
          replacement: true,
        }),
      );
    } else if (value === 'manage-marks') {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', 'quizManageMarks'],
          replacement: true,
        }),
      );
    } else if (value === 'next-quiz') {
      dispatch(actions.quiz.return__PLAY_NEXT_QUIZ());
    }
  }, []);

  const isShowingNextButton = useMemo(() => {
    const currentIndex = playingIdList.findIndex((e) => e === focusingId);
    if (!(situation === 'playing-solved' || situation === 'playing-failed')) {
      return false;
    } else if (currentIndex === -1) {
      return false;
    } else if (currentIndex >= playingIdList.length - 1) {
      return false;
    } else {
      return true;
    }
  }, [focusingId, playingIdList, situation]);

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

      <div className={`${styles['give-up']}`}>
        <button type="button" value="give-up" aria-label="Give Up" onClick={onClick_Main}>
          <FormattedMessage id={'Main.QuizPlay_ToolBar_GiveUp'} />
        </button>
      </div>

      <div className={`${styles['answers-marks']}`}>
        {(situation === 'playing-solved' || situation === 'playing-failed') && (
          <>
            <button
              type="button"
              value="manage-answers"
              aria-label="Manage Answers"
              onClick={onClick_Main}
            >
              <IconAnswer
                className={`${styles['icon__answer']}`}
                kind={focusingQuizData.correctSanSeriesList.length === 0 ? 'light' : 'solid'}
              />
              <span> {focusingQuizData.correctSanSeriesList.length} </span>
            </button>

            <button
              type="button"
              value="manage-marks"
              aria-label="Manage Marks"
              onClick={onClick_Main}
            >
              <IconMark
                className={`${styles['icon__mark']}`}
                kind={focusingQuizData.markedSanSeriesList.length === 0 ? 'light' : 'solid'}
              />
              <span> {focusingQuizData.markedSanSeriesList.length} </span>
            </button>
          </>
        )}
      </div>

      <div className={`${styles['...']}`}></div>

      <div className={`${styles['exit']}`}>
        {isShowingNextButton && (
          <button type="button" value="next-quiz" aria-label="Next quiz" onClick={onClick_Main}>
            <IconArrowInSquare
              className={`${styles['icon__next-quiz']}`}
              kind="solid"
              direction="right"
            />
          </button>
        )}
      </div>
    </div>
  );
}
