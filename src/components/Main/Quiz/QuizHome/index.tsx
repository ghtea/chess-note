import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';

import styles from './index.module.scss';
import ShortCuts from './ShortCuts';
import QuizDisplay from './QuizDisplay';
// import IconSort from 'svgs/basic/IconSort';

function QuizHome() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state: RootState) => state.status.auth.user);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (userStatus.ready || (userStatus.tried && !userStatus.ready)) {
      dispatch(
        actions.quiz.return__GET_QUIZ_LIST({
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
