import React, { useCallback, useEffect, useMemo, useState } from 'react';
import history from 'libraries/history';
import chessFocusing from 'libraries/chess';

import { FormattedMessage } from 'react-intl';

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
import IconMention from 'svgs/basic/IconExclamationCircle';

import IconBackToStart from 'svgs/basic/IconAngleDouble';
import IconBackOneMove from 'svgs/basic/IconAngle';
// import {Chess} from 'chess.js'; // => makes error

function ToolBarQE() {
  const dispatch = useDispatch();

  const heightToolbar = useSelector(
    (state: StateRoot) => state.appearance.layout.document.chessBoard.toolBar.height,
  );
  const lengthChessBoard = useSelector(
    (state: StateRoot) => state.appearance.layout.document.chessBoard.length,
  );
  //const quizPresent = useSelector((state: StateRoot)=>state.present.quiz.focusing);
  const quizData = useSelector((state: StateRoot) => state.data.quiz.focusing);

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
      dispatch(actions.data.quiz.return__BACK_TO_START());
    } else if (value === 'forward') {
    } else if (value === 'set') {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', 'quizEditingSet'],
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
          value="back-one-move"
          aria-label="Back One Move"
          onClick={onClick_Main}
        >
          <IconBackOneMove
            className={`${styles['icon__back-one-move']}`}
            kind="regular"
            direction="left"
          />
        </button>
      </div>

      <div className={`${styles['mode']}`}>
        <button value="create" type="button" onClick={onClick_Main}>
          <FormattedMessage id={'Global.Create'} />
        </button>
      </div>

      <div className={`${styles['count']}`}>
        <button type="button" value="show-answers" aria-label="Show Answers" onClick={onClick_Main}>
          <IconAnswer
            className={`${styles['icon__answer']}`}
            kind={quizData.correctSanSeriesList.length === 0 ? 'light' : 'solid'}
          />
          <span> {quizData.correctSanSeriesList.length} </span>
        </button>

        <button
          type="button"
          value="show-mentions"
          aria-label="Show Mentions"
          onClick={onClick_Main}
        >
          <IconMention
            className={`${styles['icon__mention']}`}
            kind={quizData.markedSanSeriesList.length === 0 ? 'light' : 'solid'}
          />
          <span> {quizData.markedSanSeriesList.length} </span>
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
