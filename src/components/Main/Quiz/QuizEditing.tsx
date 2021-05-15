import ChessBoard from 'components/Global/ChessBoard';
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
//import { useQuery, gql } from '@apollo/client';

import { ChessInstance, Move, Square } from 'chess.js';
import chessPlaying from 'libraries/chess';
import styles from './QuizEditing.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import ToolBarQE from './QuizEditing/ToolBarQE';
import StatusBarQE from './QuizEditing/StatusBarQE';

function QuizEditing() {
  const dispatch = useDispatch();

  const quizPresent = useSelector((state: StateRoot) => state.present.quiz.focusing);
  const side = useSelector((state: StateRoot) => state.data.quiz.focusing.turnNext);
  const idQuiz = useSelector((state: StateRoot) => state.data.quiz.focusing?.id);

  const statusUser = useSelector((state: StateRoot) => state.status.auth.user);
  const idUser = useSelector((state: StateRoot) => state.auth.user?.id);

  useEffect(() => {
    //const idQuizFromUri = (window.location.pathname.match(/[^\/]*$/) || [])[0];
    const modeFromUrl = window.location.pathname.replace(/\/quiz\/([^/]*).*/, '$1');
    const idQuizFromUri = window.location.pathname.replace(/\/quiz\/edit\/([^/]*).*/, '$1');

    //console.log('edit-idQuizFromUri: ', idQuizFromUri)
    if (modeFromUrl === 'create') {
      dispatch(
        actions.data.quiz.return__FOCUS_QUIZ({
          situation: 'creating',
        }),
      );
    }

    if (modeFromUrl === 'edit' && idQuizFromUri) {
      // 로그인하고 아이디 얻었을 때, 로그인 체크 끝나고 로그인 안되어있을 때
      if ((statusUser.ready && idUser) || (statusUser.tried && !statusUser.ready)) {
        // 현재 로컬에 있는 퀴즈 아이디와 uri에 있는 퀴즈 아이디가 서로 다를 때
        if (!idQuiz || idQuizFromUri !== idQuiz) {
          //console.log('here: ', idUser)
          //console.log('idQuizFromUri: ', idQuizFromUri)
          dispatch(
            actions.data.quiz.return__GET_QUIZ_BY_ID({
              idQuiz: idQuizFromUri,
              idUserInApp: idUser,
              situation: 'editing',
            }),
          );
        }
      }
    }
  }, [window.location.pathname, statusUser, idQuiz]);

  const listSquare = useMemo(() => {
    return chessPlaying.board();
  }, [quizPresent.fen]);

  return (
    <div className={`${styles['root']}`}>
      <StatusBarQE />

      <ChessBoard listSquare={listSquare} side={side || 'white'} page={'quiz'} />

      <ToolBarQE />
    </div>
  );
}

export default QuizEditing;

/*
const onClick_Button = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //const {currentTarget: {value}} = event;
        setPgn(`
          1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 Nc6 5. Nxc3 Bb4 6. Qb3 Bxc3+ 7. bxc3 Na5
          8. Bxf7+ Kf8 9. Qb4+ d6 10. Bxg8 Nc6 11. Qb3 Rxg8 12. Nf3 Qe7 13. e5 Nxe5 14.
          O-O Nxf3+ 15. gxf3 Be6 16. Qc2 g6 17. Ba3 Kf7 18. Rfe1 c5 19. Re3 Rge8 20. Rae1
          Qh4 21. Bb2 Bh3 22. Re4 1-0
          `
        )
    }, []
);


*/
