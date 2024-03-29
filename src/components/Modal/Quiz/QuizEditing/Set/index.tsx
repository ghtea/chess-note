import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { firebaseAuth } from 'libraries/firebase';

import history from 'libraries/history';
import { useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';

import InputRadio from 'components/common/Input/InputRadio';
import convertCase from 'tools/vanilla/convertCase';
import IconAngle from 'svgs/basic/IconAngle';

import styles from './index.module.scss';
import stylesQC from '../../common/index.module.scss';
import stylesModal from 'components/Modal/index.module.scss';

import { correctChessMoveTree, markedChessMoveTree } from 'components/Main/Quiz/chessMoveTree';
import * as types from 'store/types';

type PropsQuizEditingSet = {
  quizModalPositionStyle: React.CSSProperties;
};

function QuizEditingSet({ quizModalPositionStyle }: PropsQuizEditingSet) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const focusingQuizState = useSelector((state: RootState) => state.quiz.state.focusing);
  const focusingQuizData = useSelector((state: RootState) => state.quiz.data.focusing);
  const [indexAnswer, setIndexAnswer] = useState<number>(0);

  const refModal = useRef<HTMLDivElement>(null);
  const onClick_Window = useCallback(
    (event: MouseEvent) => {
      if (!refModal.current?.contains(event.target as Node)) {
        dispatch(
          actions.appearance.return__REPLACE({
            keyList: ['showing', 'modal', convertCase('QuizEditingSet', 'camel')],
            replacement: false,
          }),
        );
      }
    },
    [refModal],
  );
  useEffect(() => {
    // close sub menu when click outside of menu
    window.addEventListener('click', onClick_Window);
    return () => window.removeEventListener('click', onClick_Window);
  }, [onClick_Window]);

  const onClick_AnyMainButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const value = e.currentTarget.value;
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', convertCase('QuizEditingSet', 'camel')],
          replacement: false,
        }),
      );

      if (value === 'start') {
        if (focusingQuizData.startingFen !== types.quiz.defaultFen) {
          if (window.confirm(intl.formatMessage({ id: 'Confirm.AreYouSureToChangeStartingFen' }))) {
            dispatch(
              actions.quiz.return__CHANGE_STARTING_FEN({
                startingFen: focusingQuizState.fen,
              }),
            );
          }
        } else {
          // 현재 시작지점이 체스 시작시점이라 바로 초기화해도 잃는게 거의 없음
          dispatch(
            actions.quiz.return__CHANGE_STARTING_FEN({
              startingFen: focusingQuizState.fen,
            }),
          );
        }
      } else if (value === 'answer') {
        correctChessMoveTree.putSanSeries(focusingQuizState.sanSeries);
        dispatch(
          actions.quiz.return__REPLACE({
            keyList: ['data', 'focusing', 'correctSanSeriesList'],
            replacement: correctChessMoveTree.returnSanSeriesList(),
          }),
        );
      } else if (value === 'mark') {
        markedChessMoveTree.putSanSeries(focusingQuizState.sanSeries);
        dispatch(
          actions.quiz.return__REPLACE({
            keyList: ['data', 'focusing', 'markedSanSeriesList'],
            replacement: markedChessMoveTree.returnSanSeriesList(),
          }),
        );
      }
    },
    [focusingQuizState.sanSeries, focusingQuizData.correctSanSeriesList],
  );

  const isShowingSetAsAnswer = useMemo(() => {
    if (
      focusingQuizData.startingFen &&
      focusingQuizState.sanSeries.length > 0 &&
      focusingQuizState.turn !== focusingQuizData.nextTurn
    ) {
      return true;
    } else {
      return false;
    }
  }, [focusingQuizData.startingFen, focusingQuizState.sanSeries]);

  const isShowingSetAsMark = useMemo(() => {
    if (focusingQuizData.startingFen && focusingQuizState.sanSeries.length > 0) {
      return true;
    } else {
      return false;
    }
  }, [focusingQuizData.startingFen, focusingQuizState.sanSeries]);

  return (
    <div className={`${styles['root']} ${stylesQC['root']} ${stylesModal['root']}`}>
      <div className={`${stylesModal['outside']}`} aria-label="Outside Set" />

      <div
        className={`${styles['modal']} ${stylesQC['modal']} ${stylesModal['modal']}`}
        role="dialog"
        aria-labelledby="Heading_Set"
        ref={refModal}
        style={quizModalPositionStyle}
      >
        <div className={`${stylesModal['content']} ${stylesQC['content']} ${styles['content']}`}>
          <div className={`${stylesModal['content__section']}`}>
            <button
              type="button"
              value="start"
              className={`${styles['button__start']}`}
              onClick={onClick_AnyMainButton}
            >
              <FormattedMessage id={`Modal.QuizEditingSet_SetAsStart`} />
            </button>
          </div>

          {isShowingSetAsAnswer && (
            <div className={`${stylesModal['content__section']}`}>
              <button
                type="button"
                value="answer"
                className={`${styles['button__answer']}`}
                onClick={onClick_AnyMainButton}
              >
                <FormattedMessage id={`Modal.QuizEditingSet_SetAsAnswer`} />
              </button>
            </div>
          )}
          {isShowingSetAsMark && (
            <div className={`${stylesModal['content__section']}`}>
              <button
                type="button"
                value="mark"
                className={`${styles['button__mark']}`}
                onClick={onClick_AnyMainButton}
              >
                <FormattedMessage id={`Modal.QuizEditingSet_SetAsMark`} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

QuizEditingSet.defaultProps = {};

export default QuizEditingSet;
