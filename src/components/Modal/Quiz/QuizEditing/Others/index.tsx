import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { firebaseAuth } from 'libraries/firebase';

import history from 'libraries/history';
import focusingChess from 'libraries/chess';
import {
  correctChessMoveTree,
  markedChessMoveTree,
} from 'components/Main/Quiz/chessMoveTree';

import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as clipboardy from 'clipboardy';

import { useSelector, useDispatch } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';

import InputRadio from 'components/Global/Input/InputRadio';
import convertCase from 'tools/vanilla/convertCase';
import IconAngle from 'svgs/basic/IconAngle';

import styles from './index.module.scss';
import stylesQC from '../../common/index.module.scss';
import stylesModal from 'components/Modal/index.module.scss';

type PropsQuizEditingOthers = {
  top: number;
};

function QuizEditingOthers({ top }: PropsQuizEditingOthers) {
  const dispatch = useDispatch();

  const focusingQuizState = useSelector((state: StateRoot) => state.quiz.state.focusing);

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
          focusingChess.load(valueFromClipboard);
          const turn = focusingChess.turn() === 'w' ? 'white' : 'black';

          dispatch(
            actions.quiz.return__REPLACE({
              keyList: ['data', 'focusing', 'startingFen'],
              replacement: focusingChess.fen(),
            }),
          );

          dispatch(
            actions.quiz.return__REPLACE({
              keyList: ['data', 'focusing', 'side'],
              replacement: turn,
            }),
          );

          const newQuizState = {
            ...focusingQuizState,
            fen: focusingChess.fen(),
            turn: turn,
            sanSeries: [],
          };

          dispatch(
            actions.quiz.return__REPLACE({
              keyList: ['state', 'focusing'],
              replacement: newQuizState,
            }),
          );
        } else {
          dispatch(
            actions.notification.return__ADD_DELETE_BANNER({
              codeSituation: 'QuizEditingOthers_NotValidFen',
            }),
          );
        }
      } 
    },
    [focusingQuizState, focusingChess],
  );

  return (
    <div className={`${stylesQC['root']} ${stylesQC['root']} ${stylesModal['root']}`}>
      <div className={`${stylesModal['outside']}`} aria-label="Outside Save" />

      <div
        className={`${stylesModal['modal']} ${stylesQC['modal']} ${stylesQC['modal']}`}
        role="dialog"
        aria-labelledby="Heading_Save"
        ref={refModal}
        style={{ top: top }}
      >
        <div className={`${stylesModal['content']} ${stylesQC['content']} ${stylesQC['content']}`}>
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

        </div>
      </div>
    </div>
  );
}

QuizEditingOthers.defaultProps = {};

export default QuizEditingOthers;
