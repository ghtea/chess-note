import ChessBoard from 'components/common/ChessBoard';
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import history from 'libraries/history';
import { ChessInstance, Move, Square } from 'chess.js';
import focusingChess from 'libraries/chess';
import styles from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import ToolBarQE from './ToolBar';
import StatusBarQE from './StatusBar';

export default function QuizEditingEntireBoard() {
  const dispatch = useDispatch();

  const focusingQuizState = useSelector((state: RootState) => state.quiz.state.focusing);

  const focusingQuizStatus = useSelector((state: RootState) => state.status.data.quiz.focusing);
  const side = useSelector((state: RootState) => state.quiz.data.focusing.nextTurn);
  const authorId = useSelector((state: RootState) => state.quiz.data.focusing.authorId);
  const quizId = useSelector((state: RootState) => state.quiz.data.focusing?.id);

  const statusUser = useSelector((state: RootState) => state.status.auth.user);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    //const quizIdFromUri = (window.location.pathname.match(/[^\/]*$/) || [])[0];
    const modeFromUrl = window.location.pathname.replace(/\/quiz\/([^/]*).*/, '$1');
    const quizIdFromUri = window.location.pathname.replace(/\/quiz\/edit\/([^/]*).*/, '$1');

    if (modeFromUrl === 'create') {
      dispatch(
        actions.quiz.return__FOCUS_QUIZ({
          situation: 'creating',
        }),
      );
    }

    if (modeFromUrl === 'edit' && quizIdFromUri) {
      // 로그인하고 아이디 얻었을 때, 로그인 체크 끝나고 로그인 안되어있을 때
      if ((statusUser.ready && userId) || (statusUser.tried && !statusUser.ready)) {
        // 현재 로컬에 있는 퀴즈 아이디와 uri에 있는 퀴즈 아이디가 서로 다를 때
        if (!quizId || quizIdFromUri !== quizId) {
          //console.log('here: ', userId)
          //console.log('quizIdFromUri: ', quizIdFromUri)
          dispatch(
            actions.quiz.return__GET_QUIZ_BY_ID({
              quizId: quizIdFromUri,
              userIdInApp: userId,
              situation: 'editing',
            }),
          );
        }
      }
    }
  }, [window.location.pathname, statusUser, quizId, userId]);

  // http://localhost:3000/quiz/edit/647bf5aa-05a5-4565-bf62-85a9b45bda55
  // 난제: 왜 위 주소로 바로 들어갔을 때 경고가 두번 뜨는지 아직도 모르겠다
  useEffect(() => {
    // console.log('triggered!!!')
    // console.log(statusUser, userId, authorId, focusingQuizStatus)
    if (statusUser.tried && focusingQuizStatus.ready) {
      if (authorId && userId !== authorId) {
        //console.log('values: ', statusUser.tried, focusingQuizStatus.ready, authorId, userId)
        dispatch(
          actions.notification.return__ADD_DELETE_BANNER({
            situationCode: 'EditQuiz_NotAuthor__E',
          }),
        );
        history.push('/quiz');
      }
    }
  }, [statusUser.tried, userId, authorId, focusingQuizStatus.ready]);

  const listSquare = useMemo(() => {
    return focusingChess.board();
  }, [focusingQuizState.fen]);

  return (
    <div className={`${styles['root']}`}>
      <StatusBarQE />

      <ChessBoard listSquare={listSquare} side={side || 'white'} page={'quiz'} />

      <ToolBarQE />
    </div>
  );
}
