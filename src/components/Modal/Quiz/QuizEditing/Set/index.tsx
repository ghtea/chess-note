import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { firebaseAuth } from 'libraries/firebase';

import history from 'libraries/history';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';

import InputRadio from 'components/Global/Input/InputRadio';
import convertCase from 'tools/vanilla/convertCase';
import IconAngle from 'svgs/basic/IconAngle';

import styles from './index.module.scss';
import stylesQC from '../../common/index.module.scss';
import stylesModal from 'components/Modal/index.module.scss';

import { treeMove } from 'libraries/chess';

type PropsQuizEditingSet = {
  top: number;
};

function QuizEditingSet({ top }: PropsQuizEditingSet) {
  const dispatch = useDispatch();

  const quizPresent = useSelector((state: StateRoot) => state.present.quiz.focusing);
  const quizData = useSelector((state: StateRoot) => state.data.quiz.focusing);
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
        dispatch(
          actions.data.return__REPLACE({
            keyList: ['quiz', 'focusing', 'startingFen'],
            replacement: quizPresent.fen,
          }),
        );
        dispatch(
          actions.present.return__REPLACE({
            keyList: ['quiz', 'focusing', 'sanSeries'],
            replacement: [],
          }),
        );
      } else if (value === 'answer') {
        treeMove.putSeriesSan(quizPresent.sanSeries);
        dispatch(
          actions.data.return__REPLACE({
            keyList: ['quiz', 'focusing', 'correctSanSeriesList'],
            replacement: treeMove.returnListSeriesSan(),
          }),
        );
      }
    },
    [quizPresent.sanSeries, quizData.correctSanSeriesList],
  );

  const showingOtherOptions = useMemo(() => {
    if (quizData.startingFen && quizPresent.sanSeries.length > 0) {
      return true;
    } else {
      return false;
    }
  }, [quizData.startingFen, quizPresent.sanSeries]);

  return (
    <div className={`${styles['root']} ${stylesQC['root']} ${stylesModal['root']}`}>
      <div className={`${stylesModal['outside']}`} aria-label="Outside Set" />

      <div
        className={`${styles['modal']} ${stylesQC['modal']} ${stylesModal['modal']}`}
        role="dialog"
        aria-labelledby="Heading_Set"
        ref={refModal}
        style={{ top: top }}
      >
        <div className={`${stylesModal['content']} ${stylesQC['content']} ${styles['content']}`}>
          <div className={`${stylesModal['content__section']}`}>
            <button
              type="button"
              value="start"
              className={`${styles['button__start']}`}
              onClick={onClick_AnyMainButton}
            >
              {' '}
              <FormattedMessage id={`Modal.QuizEditingSet_SetAsStart`} />{' '}
            </button>
          </div>

          {showingOtherOptions && (
            <>
              <div className={`${stylesModal['content__section']}`}>
                <button
                  type="button"
                  value="answer"
                  className={`${styles['button__answer']}`}
                  onClick={onClick_AnyMainButton}
                >
                  {' '}
                  <FormattedMessage id={`Modal.QuizEditingSet_SetAsAnswer`} />{' '}
                </button>
              </div>

              <div className={`${stylesModal['content__section']}`}>
                <button
                  type="button"
                  value="memo"
                  className={`${styles['button__memo']}`}
                  onClick={onClick_AnyMainButton}
                >
                  {' '}
                  <FormattedMessage id={`Modal.QuizEditingSet_SetAsMention`} />{' '}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

QuizEditingSet.defaultProps = {};

export default QuizEditingSet;
