import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';

import styles from './index.module.scss';
import { KindGetFocusListQuiz } from 'store/types/data/quiz';
import ShortCuts from './ShortCuts';
import DisplayQuiz from './DisplayQuiz';
// import IconSort from 'svgs/basic/IconSort';

function QuizHome() {
  const dispatch = useDispatch();
  const userReady = useSelector((state: StateRoot) => state.status.auth.user.ready);
  const userId = useSelector((state: StateRoot) => state.auth.user?.id);

  useEffect(() => {
    dispatch(
      actions.data.quiz.return__GET_QUIZ_LIST_DICT({
        userId: userId,
      }),
    );
  }, []);

  return (
    <div className={`${styles['root']}`}>
      <ShortCuts />
      <DisplayQuiz />
    </div>
  );
}

QuizHome.defaultProps = {};

export default QuizHome;
