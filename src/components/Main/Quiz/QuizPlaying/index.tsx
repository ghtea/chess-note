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

  const focusingQuizStatus = useSelector((state: StateRoot) => state.status.data.quiz.focusing);
  const focusingQuizState = useSelector((state: StateRoot) => state.quiz.state.focusing);
  const side = useSelector((state: StateRoot) => state.quiz.data.focusing.nextTurn);
  const quizId = useSelector((state: StateRoot) => state.quiz.data.focusing?.id);

  const statusUser = useSelector((state: StateRoot) => state.status.auth.user);
  const userId = useSelector((state: StateRoot) => state.auth.user?.id);

  const listSquare = useMemo(() => {
    return chessPlaying.board();
  }, [focusingQuizState.fen]);

  useEffect(() => {
    const modeFromUrl = window.location.pathname.replace(/\/quiz\/([^/]*).*/, '$1');
    const quizIdFromUri = window.location.pathname.replace(/\/quiz\/play\/([^/]*).*/, '$1');

    if (modeFromUrl === 'play' && quizIdFromUri) {
      if (statusUser.tried) {
        // 현재 로컬에 있는 퀴즈 아이디와 uri에 있는 퀴즈 아이디가 서로 다를 때
        if (!quizId || quizIdFromUri !== quizId) {

          console.log('quizId: ', quizId)
          dispatch(
            actions.quiz.return__GET_QUIZ_BY_ID({
              quizId: quizIdFromUri,
              userIdInApp: userId,
              situation: 'playing-trying',
            }),
          );
        }
      }
    }
  }, [window.location.pathname, statusUser.tried, quizId, userId]);

  return (
    <div className={`${styles['root']}`}>
      <StatusBarQP />

      <ChessBoard listSquare={listSquare} side={side || 'white'} page={'quiz'} />

      <ToolBarQP />
    </div>
  );
}

export default QuizPlaying;
