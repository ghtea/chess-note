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

import InputRadio from 'components/common/Input/InputRadio';
import convertCase from 'tools/vanilla/convertCase';
import IconAngle from 'svgs/basic/IconAngle';

import styles from './index.module.scss';
import stylesQC from '../../common/index.module.scss';
import stylesModal from 'components/Modal/index.module.scss';

type PropsQuizPlayingOthers = {
  quizModalPositionStyle: React.CSSProperties;

};

function QuizPlayingOthers({ quizModalPositionStyle }: PropsQuizPlayingOthers) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const focusingQuizData = useSelector((state: RootState) => state.quiz.data.focusing);
  const focusingQuizState = useSelector((state: RootState) => state.quiz.state.focusing);

  const refModal = useRef<HTMLDivElement>(null);
  const onClick_Window = useCallback(
    (event: MouseEvent) => {
      if (!refModal.current?.contains(event.target as Node)) {
        dispatch(
          actions.appearance.return__REPLACE({
            keyList: ['showing', 'modal', convertCase('QuizPlayingOthers', 'camel')],
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
      if (value === 'edit') {
        dispatch(
          actions.quiz.return__FOCUS_QUIZ({
            quiz: focusingQuizData,
            situation: 'editing',
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
          keyList: ['showing', 'modal', 'quizPlayingOthers'],
          replacement: false,
        }),
      );
    },
    [focusingQuizState, focusingQuizData],
  );

  const isShowingManipulateButton = useMemo(() => {
    if (userId === focusingQuizData.authorId) {
      return true;
    } else {
      return false;
    }
  }, [userId, focusingQuizData.authorId]);

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
          {isShowingManipulateButton && (
            <>
              <div className={`${stylesModal['content__section']}`}>
                <button
                  type="button"
                  value="edit"
                  className={`${styles['button__edit']} ${stylesModal['button__basic']}`}
                  onClick={onClick_AnyMainButton}
                >
                  <FormattedMessage id={'Global.Edit'} />
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

QuizPlayingOthers.defaultProps = {};

export default QuizPlayingOthers;
