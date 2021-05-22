import React, { useCallback, useEffect, useMemo, useState } from 'react';
import history from 'libraries/history';
import focusingChess from 'libraries/chess';

import { FormattedMessage } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';

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
import IconBackToPrevious from 'svgs/basic/IconAngle';
// import {Chess} from 'chess.js'; // => makes error

function ToolBarQE() {
  const dispatch = useDispatch();

  const situation = useSelector((state: RootState) => state.quiz.state.situation);

  const toolbarHeight = useSelector(
    (state: RootState) => state.appearance.layout.document.entireBoard.toolBar.height,
  );
  const chessBoardLength = useSelector(
    (state: RootState) => state.appearance.layout.document.entireBoard.chessBoard.length,
  );
  //const focusingQuizState = useSelector((state: RootState)=>state.quiz.state.focusing);
  const focusingQuizData = useSelector((state: RootState) => state.quiz.data.focusing);

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
    if (value === 'create') {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', 'quizEditingUpload'],
          replacement: true,
        }),
      );
    } else if (value === 'back-to-start') {
      dispatch(actions.quiz.return__BACK_TO_START());
    } else if (value === 'back-to-previous') {
      dispatch(actions.quiz.return__BACK_TO_PREVIOUS());
    } else if (value === 'set') {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', 'quizEditingSet'],
          replacement: true,
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
        width: chessBoardLength,
        height: toolbarHeight,
      }}
    >
      <div className={`${styles['back']}`}>
        <button
          type="button"
          value="back-to-start"
          aria-label="Back to Start"
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
          <IconBackToPrevious
            className={`${styles['icon__back-to-previous']}`}
            kind="regular"
            direction="left"
          />
        </button>
      </div>

      <div className={`${styles['mode']}`}>
        <button value="create" type="button" onClick={onClick_Main}>
          <FormattedMessage id={situation === 'creating' ? 'Global.Create' : 'Global.Update'} />
        </button>
      </div>

      <div className={`${styles['answers-marks']}`}>
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

        <button type="button" value="manage-marks" aria-label="Manage Marks" onClick={onClick_Main}>
          <IconMark
            className={`${styles['icon__mark']}`}
            kind={focusingQuizData.markedSanSeriesList.length === 0 ? 'light' : 'solid'}
          />
          <span> {focusingQuizData.markedSanSeriesList.length} </span>
        </button>
      </div>

      <div className={`${styles['set']}`}>
        <button type="button" value="set" onClick={onClick_Main}>
          <FormattedMessage id={'Global.Set'} />
        </button>
      </div>

      <div className={`${styles['others']}`}>
        <button type="button" value="others" aria-label="others" onClick={onClick_Main}>
          <IconOthers className={`${styles['icon__others']}`} kind="regular" />
        </button>
      </div>
    </div>
  );
}

ToolBarQE.defaultProps = {};

export default ToolBarQE;
