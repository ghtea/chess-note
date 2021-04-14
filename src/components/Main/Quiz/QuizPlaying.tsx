import ChessBoard from 'components/Global/ChessBoard';
import React, { useCallback, useState, useMemo, useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import {v4 as uuid} from 'uuid';
//import { useQuery, gql } from '@apollo/client';

import { ChessInstance, Move, Square } from 'chess.js'
import { useDispatch, useSelector } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions  from 'store/actions';
import ToolBarPlaying from './QuizPlaying/ToolBarPlaying';
const ChessReq:any = require('chess.js');
// https://stackoverflow.com/questions/58598457/not-a-constructor-error-with-library-and-angular
// const Chess:ChessInstance = new ChessReq();




type PropsQuizPlaying = {};

function QuizPlaying({}: PropsQuizPlaying) {
  
  const dispatch = useDispatch();

  const statusQuiz = useSelector((state: StateRoot)=>state.status.current.quiz);
  const quizFocusing = useSelector((state: StateRoot)=>state.data.quiz.focusing);
  const idQuiz = useSelector((state: StateRoot)=>state.data.quiz.focusing?.id);
  //const { loading, error, data } = useQuery(GET_LIST_QUIZ);

  const gameCurrent: ChessInstance = useMemo(()=>{
    const result: ChessInstance = new ChessReq();
    result.load(quizFocusing.fenStart);
    return result;
  },[quizFocusing]);


  useEffect(()=>{
    const idQuizFromUri = (window.location.pathname.match(/[^/]*$/) || [])[0];

    if (idQuizFromUri !== idQuiz || !idQuiz){
      dispatch(actions.data.quiz.return__GET_QUIZ_BY_ID({ 
        idQuiz: idQuizFromUri,
      }));  
    }
    
    // console.log(idQuiz)
    //console.log(window.location.pathname)
  },[window.location.pathname, idQuiz])

  // const loadFen = useCallback(
  //   (fen: string)=>{
  //     const result = gameCurrent.load(fen);
  //     if (result){
  //       dispatch( actions.status.return__REPLACE({
  //         listKey: ['current', 'quiz', 'fen'],
  //         replacement: gameCurrent.fen()
  //     }) );
  //     }
  // }, [gameCurrent]);

  // fenToLoad 가 바뀌면 그걸로 load 해보고 되면 다시 fenToLoad null 로 변경
  useEffect(()=>{ 
    if (statusQuiz.fenToLoad !== null){
      const result = gameCurrent.load(statusQuiz.fenToLoad);
      if (result){
        dispatch( actions.status.return__REPLACE({
          listKey: ['current', 'quiz', 'fen'],
          replacement: gameCurrent.fen()
        }) );

        const side = statusQuiz.fenToLoad.includes(" w") ? 'white' : 'black';
        dispatch( actions.data.return__REPLACE({
          listKey: ['quiz', 'focusing', 'side'],
          replacement: side
        }) );
        dispatch( actions.status.return__REPLACE({
          listKey: ['current', 'quiz', 'turn'],
          replacement: side
        }) );
      }
      dispatch( actions.status.return__REPLACE({
        listKey: ['current', 'quiz', 'fenToLoad'],
        replacement: null,
      }) );
    }
  },[gameCurrent])


  // 주의사항
  // move 를 다른 컴포넌트로 넘기면, 이 move 가 여기선 dependency list 가 변하면 적용되지만,
  // 다른 컴포넌트에서 리스너로 붙인건 업데이트 안될수도 있다?!
  const move = useCallback(
    (from: string, to: string): Move | null=>{
      const result = gameCurrent.move({from: from as Square, to: to as Square});
      if (result){
        //console.log(statusQuiz.listMove);

        const replacement = {
          ...statusQuiz,
          fen: gameCurrent.fen(),
          turn: result.color === 'w' ? 'black' : 'white',
          listMove: [...statusQuiz.listMove, result.san],
        }

        dispatch( actions.status.return__REPLACE({
          listKey: ['current', 'quiz'],
          replacement: replacement,
        }) );

        return result;
      }
      else {
        return result;
      }
  }, [gameCurrent, statusQuiz]);


  


  const listSquare = useMemo(()=>{
    return gameCurrent.board(); 
    // if (side==='white'){
    //   return gameCurrent.board(); 
    // }
    // else {
    //   return gameCurrent.board().reverse(); 
    // }
  }, [gameCurrent, statusQuiz.fen]);

  return (
    <div>
      <ChessBoard
        move={move}
        listSquare={listSquare}
        side={quizFocusing.side || 'white'}
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