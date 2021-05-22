import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { firebaseAuth } from 'libraries/firebase';

import history from 'libraries/history';
import focusingChess from 'libraries/chess';
import { correctChessMoveTree, markedChessMoveTree } from 'components/Main/Quiz/chessMoveTree';

import { useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import * as clipboardy from 'clipboardy';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

import InputRadio from 'components/Global/Input/InputRadio';
import convertCase from 'tools/vanilla/convertCase';
import IconAngle from 'svgs/basic/IconAngle';

import styles from './index.module.scss';
import stylesQC from '../../common/index.module.scss';
import stylesModal from 'components/Modal/index.module.scss';

type PropsQuizEditingOthers = {
  quizModalPositionStyle: React.CSSProperties;

};

function QuizEditingOthers({ quizModalPositionStyle }: PropsQuizEditingOthers) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const focusingQuizData = useSelector((state: RootState) => state.quiz.data.focusing);
  const focusingQuizState = useSelector((state: RootState) => state.quiz.state.focusing);

  const refModal = useRef<HTMLDivElement>(null);
  const onClick_Window = useCallback(
    (event: MouseEvent) => {
      if (!refModal.current?.contains(event.target as Node)) {
        dispatch(
          actions.appearance.return__REPLACE({
            keyList: ['showing', 'modal', convertCase('QuizEditingOthers', 'camel')],
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
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const value = e.currentTarget.value;

      if (value === 'use-fen') {
        const valueFromClipboard = await clipboardy.read();
        const { valid } = focusingChess.validate_fen(valueFromClipboard);
        if (valid) {
          if (focusingQuizData.startingFen !== types.quiz.defaultFen) {
            if (
              window.confirm(intl.formatMessage({ id: 'Confirm.AreYouSureToChangeStartingFen' }))
            ) {
              dispatch(
                actions.quiz.return__CHANGE_STARTING_FEN({
                  startingFen: valueFromClipboard,
                }),
              );
            }
          } else {
            // 현재 시작지점이 체스 시작시점이라 바로 초기화해도 잃는게 거의 없음
            dispatch(
              actions.quiz.return__CHANGE_STARTING_FEN({
                startingFen: valueFromClipboard,
              }),
            );
          }
        } else {
          // not valid
          dispatch(
            actions.notification.return__ADD_DELETE_BANNER({
              situationCode: 'QuizEditingOthers_NotValidFen__E',
            }),
          );
          console.error('not valid fen');
        }
      } else if (value === 'play') {
        dispatch(
          actions.quiz.return__FOCUS_QUIZ({
            quiz: focusingQuizData,
            situation: 'playing-trying',
          }),
        );
      } else if (value === 'delete') {
        if (window.confirm(intl.formatMessage({ id: 'Confirm.AreYouSureToDeleteThisQuiz' }))) {
          dispatch(
            actions.quiz.return__DELETE_QUIZ({
              quizId: focusingQuizData.id,
            }),
          );
        }
      }
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', 'quizEditingOthers'],
          replacement: false,
        }),
      );
    },
    [focusingQuizState, focusingQuizData, focusingChess],
  );

  return (
    <div className={`${styles['root']} ${stylesQC['root']} ${stylesModal['root']}`}>
      <div className={`${stylesModal['outside']}`} aria-label="Outside Save" />

      <div
        className={`${stylesModal['modal']} ${stylesQC['modal']} ${stylesQC['modal']}`}
        role="dialog"
        aria-label="Others"
        ref={refModal}
        style={quizModalPositionStyle}
      >
        <div className={`${stylesModal['content']}`}>
          <div className={`${stylesModal['content__section']}`}>
            <button
              type="button"
              value="use-fen"
              className={`${styles['button__use-fen']} ${stylesQC['button__basic']}`}
              onClick={onClick_AnyMainButton}
            >
              {' '}
              <FormattedMessage id={`Modal.QuizEditingOthers_UseFen`} />{' '}
            </button>
          </div>

          <div className={`${stylesModal['content__section']}`}>
            <button
              type="button"
              value="play"
              className={`${styles['button__play']} ${stylesModal['button__basic']}`}
              onClick={onClick_AnyMainButton}
            >
              <FormattedMessage id={'Global.Play'} />
            </button>
          </div>

          <div className={`${stylesModal['content__section']}`}>
            <button
              type="button"
              value="delete"
              className={`${styles['button__delete']} ${stylesModal['button__basic']}`}
              onClick={onClick_AnyMainButton}
            >
              <FormattedMessage id={'Global.Delete'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

QuizEditingOthers.defaultProps = {};

export default QuizEditingOthers;
