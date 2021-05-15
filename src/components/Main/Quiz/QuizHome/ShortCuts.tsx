import React, { useCallback, useEffect, useMemo } from 'react';
import history from 'libraries/history';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';

import Loading from 'components/Global/Loading';

//import actionsRoot from 'store/actions';

//import Portal from './ShortCuts/Portal';

import styles from './ShortCuts.module.scss';
import { KindGetFocusListQuiz } from 'store/types/data/quiz';
import IconPlus from 'svgs/basic/IconPlus';
import IconShuffle from 'svgs/basic/IconShuffle';
// import IconSort from 'svgs/basic/IconSort';

function ShortCuts() {
  const dispatch = useDispatch();
  const readyUser = useSelector((state: StateRoot) => state.status.auth.user.ready);
  const idUser = useSelector((state: StateRoot) => state.auth.user?.id);

  const onClick_MainButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const value = e.currentTarget.value;
      if (value === 'play-public-random-quiz') {
        if (readyUser && idUser) {
          dispatch(
            actions.data.quiz.return__GET_FOCUS_LIST_QUIZ({
              kind: KindGetFocusListQuiz.publicQuizByRecord,
              idUser: idUser,
            }),
          );
        } else {
          dispatch(
            actions.data.quiz.return__GET_FOCUS_LIST_QUIZ({
              kind: KindGetFocusListQuiz.publicQuiz,
            }),
          );
        }
      } else if (value === 'play-my-random-quiz') {
        if (readyUser && idUser) {
          dispatch(
            actions.data.quiz.return__GET_FOCUS_LIST_QUIZ({
              kind: KindGetFocusListQuiz.myQuizByRecord,
              idUser: idUser,
            }),
          );
        }
      } else if (value === 'create') {
        history.push('/quiz/create');
        dispatch(
          actions.data.quiz.return__FOCUS_QUIZ({
            quiz: undefined,
            situation: 'creating',
          }),
        );
      }
    },
    [history, readyUser, idUser],
  );

  return (
    <section className={`${styles['root']}`}>
      <button
        className={`${styles['button__main']}`}
        type="button"
        value="play-public-random-quiz"
        onClick={onClick_MainButton}
      >
        <IconShuffle className={`${styles['icon__shuffle']}`} kind="regular" />
        <span>
          <FormattedMessage id={'Main.QuizHome_ShortCuts_PlayPublicQuiz'} />
        </span>
      </button>

      {readyUser && (
        <>
          <button
            className={`${styles['button__main']}`}
            type="button"
            value="play-my-random-quiz"
            onClick={onClick_MainButton}
          >
            <IconShuffle className={`${styles['icon__shuffle']}`} kind="regular" />
            <span>
              <FormattedMessage id={'Main.QuizHome_ShortCuts_PlayMyQuiz'} />
            </span>
          </button>

          <button
            className={`${styles['button__main']}`}
            type="button"
            value="create"
            onClick={onClick_MainButton}
          >
            <IconPlus className={`${styles['icon__plus']}`} kind="regular" />
            <span>
              <FormattedMessage id={'Main.QuizHome_ShortCuts_CreateQuiz'} />
            </span>
          </button>
        </>
      )}
    </section>
  );
}

ShortCuts.defaultProps = {};

export default ShortCuts;
