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
import stylesModal from 'components/Modal/index.module.scss';

export default function QuizHomeOthers() {
  const dispatch = useDispatch();
  const intl = useIntl();

  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const quizList = useSelector((state: RootState) => state.quiz.data.list);
  const displayState = useSelector((state: RootState) => state.quiz.state.display);

  const refModal = useRef<HTMLDivElement>(null);
  const onClick_Window = useCallback(
    (event: MouseEvent) => {
      if (!refModal.current?.contains(event.target as Node)) {
        dispatch(
          actions.appearance.return__REPLACE({
            keyList: ['showing', 'modal', convertCase('QuizHomeOthers', 'camel')],
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
        const quizToEdit = quizList.find(
          (e) => e.id === displayState.clickedQuizId,
        );
        dispatch(
          actions.quiz.return__FOCUS_QUIZ({
            quiz: quizToEdit,
            situation: 'editing',
          }),
        );
      } else if (value === 'delete') {
        if (window.confirm(intl.formatMessage({ id: 'Confirm.AreYouSureToDeleteThisQuiz' }))) {
          dispatch(
            actions.quiz.return__DELETE_QUIZ({
              quizId: displayState.clickedQuizId
            }),
          );
        }
      }
      // close modal after click main buttons
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', 'quizHomeOthers'],
          replacement: false,
        }),
      );
    },
    [quizList, displayState, userId],
  );

  const isShowingManipulateButton = useMemo(() => {
    const clickedQuiz = quizList.find(
      (e) => e.id === displayState.clickedQuizId,
    );
    if (userId === clickedQuiz?.authorId) {
      return true;
    } else {
      return false;
    }
  }, [userId, displayState, quizList]);

  return (
    <div className={`${styles['root']} ${stylesModal['root']}`}>
      <div className={`${stylesModal['outside']}`} aria-label="Outside Save" />

      <div className={`${stylesModal['modal']}`} role="dialog" aria-label="Others" ref={refModal}>
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
