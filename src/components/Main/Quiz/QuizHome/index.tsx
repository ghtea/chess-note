import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';

import styles from './index.module.scss';
import ShortCuts from './ShortCuts';
import QuizDisplay from './QuizDisplay';
// import IconSort from 'svgs/basic/IconSort';

function QuizHome() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state: StateRoot) => state.status.auth.user);
  const userId = useSelector((state: StateRoot) => state.auth.user?.id);

  useEffect(() => {
    if (userStatus.ready || (userStatus.tried && !userStatus.ready)) {
      dispatch(
        actions.quiz.return__GET_QUIZ_LIST_DICT({
          userId: userId,
        }),
      );
    }
  }, [userStatus, userId]);

  return (
    <div className={`${styles['root']}`}>
      <ShortCuts />
      <QuizDisplay />
    </div>
  );
}

QuizHome.defaultProps = {};

export default QuizHome;
