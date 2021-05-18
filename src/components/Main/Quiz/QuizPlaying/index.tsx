import ChessBoard from 'components/Global/ChessBoard';
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import ToolBarQP from './ToolBar';
import { v4 as uuid } from 'uuid';
//import { useQuery, gql } from '@apollo/client';

import { ChessInstance, Move, Square } from 'chess.js';
import chessPlaying from 'libraries/chess';
import styles from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import StatusBarQP from './StatusBar';

function QuizPlaying() {
  const dispatch = useDispatch();

  const quizPresent = useSelector((state: StateRoot) => state.present.quiz.focusing);
  const side = useSelector((state: StateRoot) => state.data.quiz.focusing.nextTurn);
  const quizId = useSelector((state: StateRoot) => state.data.quiz.focusing?.id);

  const statusUser = useSelector((state: StateRoot) => state.status.auth.user);
  const userId = useSelector((state: StateRoot) => state.auth.user?.id);

  const listSquare = useMemo(() => {
    return chessPlaying.board();
  }, [quizPresent.fen]);

  useEffect(() => {
    const modeFromUrl = window.location.pathname.replace(/\/quiz\/([^/]*).*/, '$1');
    const quizIdFromUri = window.location.pathname.replace(/\/quiz\/play\/([^/]*).*/, '$1');

    if (modeFromUrl === 'play' && quizIdFromUri) {
      // 로그인하고 아이디 얻었을 때 || 로그인 체크 끝나고 로그인 안되어있을 때
      if (statusUser.ready || (statusUser.tried && !statusUser.ready)) {
        // 현재 로컬에 있는 퀴즈 아이디와 uri에 있는 퀴즈 아이디가 서로 다를 때
        if (!quizId || quizIdFromUri !== quizId) {
          dispatch(
            actions.data.quiz.return__GET_QUIZ_BY_ID({
              quizId: quizIdFromUri,
              userIdInApp: userId,
              situation: 'playing',
            }),
          );
        }
      }
    }
  }, [window.location.pathname, statusUser, quizId, userId]);

  return (
    <div className={`${styles['root']}`}>
      <StatusBarQP />

      <ChessBoard listSquare={listSquare} side={side || 'white'} page={'quiz'} />

      <ToolBarQP />
    </div>
  );
}

export default QuizPlaying;