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
  const userStatus = useSelector((state: StateRoot) => state.status.auth.user);
  const userId = useSelector((state: StateRoot) => state.auth.user?.id);

  useEffect(() => {
    if (userStatus.ready || (userStatus.tried && !userStatus.ready)) {
      console.log(userStatus)
      // 현재 로컬에 있는 퀴즈 아이디와 uri에 있는 퀴즈 아이디가 서로 다를 때
      dispatch(
        actions.data.quiz.return__GET_QUIZ_LIST_DICT({
          userId: userId,
        }),
      );
    }
  }, [userStatus, userId]);

  return (
    <div className={`${styles['root']}`}>
      <ShortCuts />
      <DisplayQuiz />
    </div>
  );
}

QuizHome.defaultProps = {};

export default QuizHome;
