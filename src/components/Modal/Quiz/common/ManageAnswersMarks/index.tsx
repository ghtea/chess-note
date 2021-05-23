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

type PropsManageAnswersMarks = {
  quizModalPositionStyle: React.CSSProperties;
  kind: 'answer' | 'mark';
};

export default function ManageAnswersMarks({ quizModalPositionStyle, kind }: PropsManageAnswersMarks) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const situation = useSelector((state: RootState) => state.quiz.state.situation);
  const focusingQuizState = useSelector((state: RootState) => state.quiz.state.focusing);
  const focusingQuizData = useSelector((state: RootState) => state.quiz.data.focusing);
  const [itemIndex, setItemIndex] = useState<number>(0);

  const refModal = useRef<HTMLDivElement>(null);
  const onClick_Window = useCallback(
    (event: MouseEvent) => {
      if (!refModal.current?.contains(event.target as Node)) {
        if (true) {
          // when it is not
          dispatch(
            actions.appearance.return__REPLACE({
              keyList: [
                'showing',
                'modal',
                convertCase(kind === 'answer' ? 'QuizManageAnswers' : 'QuizManageMarks', 'camel'),
              ],
              replacement: false,
            }),
          );
        }
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
      if (value === 'show-item') {
        dispatch(
          actions.quiz.return__SHOW_ANSWER_OR_MARK({
            index: itemIndex,
            kind: kind,
          }),
        );
      } else if (value === 'delete-current-item') {
        if (
          window.confirm(
            intl.formatMessage({
              id: `Confirm.AreYouSureToDeleteThis${kind === 'answer' ? 'Answer' : 'Mark'}`,
            }),
          )
        ) {
          if (kind === 'answer') {
            correctChessMoveTree.deleteNthSeriesSan(itemIndex);
            dispatch(
              actions.quiz.return__REPLACE({
                keyList: ['data', 'focusing', 'correctSanSeriesList'],
                replacement: correctChessMoveTree.returnSanSeriesList(),
              }),
            );
          } else {
            // if (kind === 'mark') {
            markedChessMoveTree.deleteNthSeriesSan(itemIndex);
            dispatch(
              actions.quiz.return__REPLACE({
                keyList: ['data', 'focusing', 'markedSanSeriesList'],
                replacement: markedChessMoveTree.returnSanSeriesList(),
              }),
            );
          }
        }
      } else if (value === 'show-all-items') {
        dispatch(
          actions.quiz.return__SHOW_ANSWER_OR_MARK({
            length:
              focusingQuizData[kind === 'answer' ? 'correctSanSeriesList' : 'markedSanSeriesList']
                .length,
            kind: kind,
          }),
        );
      }
    },
    [focusingQuizState.sanSeries, focusingQuizData, itemIndex],
  );

  const onClick_ButtonChangeItem = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const numberItem =
        focusingQuizData[kind === 'answer' ? 'correctSanSeriesList' : 'markedSanSeriesList'].length;

      const value = e.currentTarget.value;
      let itemIndexNew = itemIndex;
      if (value === 'previous-item') {
        itemIndexNew--;
      } else {
        itemIndexNew++;
      }

      setItemIndex((itemIndexNew + numberItem) % numberItem);
    },
    [focusingQuizData.correctSanSeriesList.length, itemIndex],
  );

  const itemAllNumber = useMemo(() => {
    return focusingQuizData[kind === 'answer' ? 'correctSanSeriesList' : 'markedSanSeriesList']
      .length;
  }, [focusingQuizData, kind]);

  

  return (
    <div className={`${styles['root']} ${stylesQC['root']} ${stylesModal['root']}`}>
      <div
        className={`${stylesModal['outside']}`}
        aria-label={`Outside ${kind === 'answer' ? 'Manage Answers' : 'Manage Marks'}`}
      />

      <div
        className={`${stylesModal['modal']} ${stylesQC['modal']}`}
        role="dialog"
        aria-label={kind === 'answer' ? 'Manage Answers' : 'Manage Marks'}
        ref={refModal}
        style={quizModalPositionStyle}
      >
        <div className={`${stylesModal['content']} ${stylesQC['content']} ${styles['content']}`}>
          {itemAllNumber === 0 && (
            <div className={`${stylesModal['content__section']}`}>
              <span className={`${stylesQC['span__basic']}`}>
                <span>
                  <FormattedMessage
                    id={`Modal.QuizManageAnswersMarks_No${kind === 'answer' ? 'Answer' : 'Mark'}`}
                  />
                </span>
              </span>
            </div>
          )}

          {itemAllNumber > 0 && (
            <>
              <div className={`${stylesModal['content__section']}`}>
                <button
                  type="button"
                  value="show-item"
                  className={`${styles['button__show-item']} ${stylesQC['button__basic']}`}
                  onClick={onClick_AnyMainButton}
                >
                  <FormattedMessage
                    id={`Modal.QuizManageAnswersMarks_Show${kind === 'answer' ? 'Answer' : 'Mark'}`}
                    values={{
                      index: `${itemIndex + 1} / ${itemAllNumber}`,
                    }}
                  />
                </button>
                {itemAllNumber > 1 && (
                  <>
                    <button
                      type="button"
                      value="previous-item"
                      onClick={onClick_ButtonChangeItem}
                      className={`${stylesQC['button__previous-item']}`}
                    >
                      <IconAngle
                        className={`${stylesQC['icon__previous-item']}`}
                        direction="left"
                        kind="regular"
                      />
                    </button>
                    <button
                      type="button"
                      value="next-item"
                      aria-label="next item"
                      onClick={onClick_ButtonChangeItem}
                      className={`${stylesQC['button__next-item']}`}
                    >
                      <IconAngle
                        className={`${stylesQC['icon__next-item']}`}
                        direction="right"
                        kind="regular"
                      />
                    </button>
                  </>
                )}
              </div>
              {(situation === 'editing' || situation === 'creating') && (
                <div className={`${stylesModal['content__section']}`}>
                  <button
                    type="button"
                    value="delete-current-item"
                    className={`${styles['button__delete-current-item']} ${stylesQC['button__basic']}`}
                    onClick={onClick_AnyMainButton}
                  >
                    <FormattedMessage
                      id={`Modal.QuizManageAnswersMarks_Delete${
                        kind === 'answer' ? 'Answer' : 'Mark'
                      }`}
                      values={{
                        index: `${itemIndex + 1} / ${itemAllNumber}`,
                      }}
                    />
                  </button>

                  {itemAllNumber > 1 && (
                    <>
                      <button
                        type="button"
                        value="previous-item"
                        onClick={onClick_ButtonChangeItem}
                        className={`${stylesQC['button__previous-item']}`}
                      >
                        <IconAngle
                          className={`${stylesQC['icon__previous-item']}`}
                          direction="left"
                          kind="regular"
                        />
                      </button>

                      <button
                        type="button"
                        value="next-item"
                        onClick={onClick_ButtonChangeItem}
                        className={`${stylesQC['button__next-item']}`}
                      >
                        <IconAngle
                          className={`${stylesQC['icon__next-item']}`}
                          direction="right"
                          kind="regular"
                        />
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
          {itemAllNumber > 1 && (
            <div className={`${stylesModal['content__section']}`}>
              <button
                type="button"
                value="show-all-items"
                className={`${styles['button__show-all-items']} ${stylesQC['button__basic']}`}
                onClick={onClick_AnyMainButton}
              >
                <FormattedMessage
                  id={`Modal.QuizManageAnswersMarks_ShowAll${
                    kind === 'answer' ? 'Answers' : 'Marks'
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
