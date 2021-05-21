import React, { useCallback, useEffect, useMemo } from 'react';
import history from 'libraries/history';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';

import Loading from 'components/Global/Loading';

//import actions from 'store/actions';

//import Portal from './ShortCuts/Portal';

import styles from './index.module.scss';
import IconPlus from 'svgs/basic/IconPlus';
import IconShuffle from 'svgs/basic/IconShuffle';
import IconPlay from 'svgs/basic/IconPlay';
// import IconSort from 'svgs/basic/IconSort';

function ShortCuts() {
  const dispatch = useDispatch();
  const userReady = useSelector((state: RootState) => state.status.auth.user.ready);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const arrangedIdList = useSelector((state: RootState) => state.quiz.state.display.arrangedIdList);

  const onClick_MainButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const value = e.currentTarget.value;
      if (value === 'play-arranged-quiz-list') {
        dispatch(actions.quiz.return__PLAY_ARRANGED_QUIZ_LIST());
      } else if (value === 'create') {
        history.push('/quiz/create');
        dispatch(
          actions.quiz.return__FOCUS_QUIZ({
            quiz: undefined,
            situation: 'creating',
          }),
        );
      }
    },
    [history, userReady, userId],
  );

  return (
    <section className={`${styles['root']}`}>
      <button
        className={`${styles['button__main']} ${styles['play-arranged-quiz-list']}`}
        type="button"
        value="play-arranged-quiz-list"
        onClick={onClick_MainButton}
      >
        <IconPlay className={`${styles['icon__play']}`} kind="solid" />
        <span>
          <FormattedMessage id={'Main.QuizHome_ShortCuts_PlayArrangedQuizList'} />
        </span>
      </button>

      {userReady && (
        <>
          <button
            className={`${styles['button__main']} ${styles['create']}`}
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
