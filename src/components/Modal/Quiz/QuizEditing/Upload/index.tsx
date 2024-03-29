import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import { firebaseAuth } from 'libraries/firebase';

import history from 'libraries/history';
import { useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';

import useInputQuizEditingUpload from './useInputQuizEditingUpload';
import convertCase from 'tools/vanilla/convertCase';
import IconX from 'svgs/basic/IconX';

import styles from './index.module.scss';
import stylesQC from '../../common/index.module.scss';
import stylesModal from 'components/Modal/index.module.scss';

import InputText from 'components/common/Input/InputText';
import InputRadio from 'components/common/Input/InputRadio';

type PropsQuizEditingUpload = {
  quizModalPositionStyle: React.CSSProperties;

};

function QuizEditingUpload({ quizModalPositionStyle }: PropsQuizEditingUpload) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const userReady = useSelector((state: RootState) => state.status.auth.user.ready);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const situation = useSelector((state: RootState) => state.quiz.state.situation);
  const focusingQuizData = useSelector((state: RootState) => state.quiz.data.focusing);

  const { draft: draft_Main, onChange: onChange_Main } = useInputQuizEditingUpload({});

  const refModal = useRef<HTMLDivElement>(null);
  const onClick_Window = useCallback(
    (event: MouseEvent) => {
      if (!refModal.current?.contains(event.target as Node)) {
        dispatch(
          actions.appearance.return__REPLACE({
            keyList: ['showing', 'modal', convertCase('QuizEditingUpload', 'camel')],
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

  const onClick_Upload = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!userReady) {
        dispatch(
          actions.notification.return__ADD_DELETE_BANNER({
            situationCode: 'NotLoggedIn__E',
          }),
        );
      } else if (focusingQuizData && userId) {
        if (situation === 'creating') {
          dispatch(
            actions.quiz.return__CREATE_QUIZ({
              name: focusingQuizData.name,
              nextTurn: focusingQuizData.nextTurn,
              startingFen: focusingQuizData.startingFen,
              correctSanSeriesList: focusingQuizData.correctSanSeriesList,
              markedSanSeriesList: focusingQuizData.markedSanSeriesList,
              isPublic: focusingQuizData.isPublic,
            }),
          );
        } else {
          dispatch(
            actions.quiz.return__UPDATE_QUIZ({
              id: focusingQuizData.id as string,
              name: focusingQuizData.name,
              nextTurn: focusingQuizData.nextTurn,
              startingFen: focusingQuizData.startingFen,
              correctSanSeriesList: focusingQuizData.correctSanSeriesList,
              markedSanSeriesList: focusingQuizData.markedSanSeriesList,
              authorId: userId,
              isPublic: focusingQuizData.isPublic,
              memberReaction: focusingQuizData.memberReaction,
            }),
          );
        }
        dispatch(
          actions.appearance.return__REPLACE({
            keyList: ['showing', 'modal', convertCase('QuizEditingUpload', 'camel')],
            replacement: false,
          }),
        );
      }
    },
    [focusingQuizData, userId, userReady],
  );

  return (
    <div className={`${styles['root']} ${stylesQC['root']} ${stylesModal['root']}`}>
      <div className={`${stylesModal['outside']}`} aria-label="Outside Put" />

      <div
        className={`${stylesModal['modal']} ${stylesQC['modal']} ${styles['modal']}`}
        role="dialog"
        aria-labelledby="Heading_Put"
        ref={refModal}
        style={quizModalPositionStyle}
      >
        <div className={`${stylesModal['content']} ${stylesQC['content']} ${styles['content']}`}>
          <div className={`${stylesModal['content__section']} ${styles['input-name']}`}>
            <InputText
              name="name"
              value={focusingQuizData?.name}
              label={intl.formatMessage({ id: 'Global.Name' })}
              placeholder={intl.formatMessage({ id: 'Global.Name' })}
              required={false}
              onChange={onChange_Main}
            />
          </div>

          <div className={`${stylesModal['content__section']}`}>
            <h3>
              {' '}
              <FormattedMessage id={`Modal.QuizEditingUpload_IsPublic`} />
            </h3>

            <div className={'container__input-radio'}>
              <InputRadio
                valueCurrent={focusingQuizData.isPublic.toString()}
                name="isPublic"
                value="true"
                label={intl.formatMessage({ id: 'Modal.QuizEditingUpload_Public' })}
                onChange={onChange_Main}
              />
              <InputRadio
                valueCurrent={focusingQuizData.isPublic.toString()}
                name="isPublic"
                value="false"
                label={intl.formatMessage({ id: 'Modal.QuizEditingUpload_Private' })}
                onChange={onChange_Main}
              />
            </div>
          </div>

          <div className={`${stylesModal['content__section']}`}>
            {situation === 'creating' ? (
              <button
                type="button"
                value="create"
                className={`${styles['button__put']}`}
                onClick={onClick_Upload}
              >
                <FormattedMessage id={`Global.Create`} />
              </button>
            ) : (
              <button
                type="button"
                value="update"
                className={`${styles['button__put']}`}
                onClick={onClick_Upload}
              >
                <FormattedMessage id={`Global.Update`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

QuizEditingUpload.defaultProps = {};

export default QuizEditingUpload;
