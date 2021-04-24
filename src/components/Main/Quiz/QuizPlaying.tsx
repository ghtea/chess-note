import ChessBoard from 'components/Global/ChessBoard';
import React, { useCallback, useState, useMemo, useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import ToolBarPlaying from './QuizPlaying/ToolBarPlaying';
import {v4 as uuid} from 'uuid';
//import { useQuery, gql } from '@apollo/client';

import {ChessInstance, Move, Square } from 'chess.js'
import chessPlaying from 'chessApp';
import styles from './QuizPlaying.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions  from 'store/actions';
import StatusBarPlaying from './QuizPlaying/StatusBarPlaying';
const ChessReq:any = require('chess.js');


// https://stackoverflow.com/questions/58598457/not-a-constructor-error-with-library-and-angular
// const Chess:ChessInstance = new ChessReq();




type PropsQuizPlaying = {}; 

function QuizPlaying({}: PropsQuizPlaying) {
  
  const dispatch = useDispatch();

  const statusQuiz = useSelector((state: StateRoot)=>state.present.quiz);
  const side = useSelector((state: StateRoot)=>state.data.quiz.focusing.turnNext);
  const idQuiz = useSelector((state: StateRoot)=>state.data.quiz.focusing?.id);
  
  const statusUser = useSelector((state: StateRoot) => state.status.auth.user);
  const idUser = useSelector((state: StateRoot) => state.auth.user?.id);


  useEffect(()=>{
    const idQuizFromUri = (window.location.pathname.match(/[^\/]*$/) || [])[0];

    // 로그인하고 아이디 얻었을 때, 로그인 체크 끝나고 로그인 안되어있을 때
    if ( (statusUser.ready && idUser) || (statusUser.tried && !statusUser.ready) ){
      if (!idQuiz || idQuizFromUri !== idQuiz){
        //console.log('here: ', idUser)
        //console.log('idQuizFromUri: ', idQuizFromUri)
        dispatch(actions.data.quiz.return__GET_QUIZ_BY_ID({ 
          idQuiz: idQuizFromUri,
          idUserInApp: idUser,
        }));  
      }
    }
    
    // console.log(idQuiz)
    //console.log(window.location.pathname)
  },[window.location.pathname, statusUser.tried, idUser])


  const listSquare = useMemo(()=>{
    return chessPlaying.board(); 
  }, [statusQuiz.fen]);

  return (
    <div
      className={`${styles['root']}`}
    >

      <StatusBarPlaying />

      <ChessBoard
        listSquare={listSquare}
        side={side || 'white'}
        page={'quiz'}
      />
      
      <ToolBarPlaying />
        
      
    </div>
  );
}

export default QuizPlaying;



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