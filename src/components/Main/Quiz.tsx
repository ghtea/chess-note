import ChessBoard from 'components/Global/ChessBoard';
import React, { useCallback, useState, useMemo} from 'react';
import { Route, Switch } from "react-router-dom";
import ToolBar from './Quiz/ToolBar';
import { ChessInstance, Square } from 'chess.js'
import { useDispatch, useSelector } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions  from 'store/actions';
const ChessReq:any = require('chess.js');
// https://stackoverflow.com/questions/58598457/not-a-constructor-error-with-library-and-angular
// const Chess:ChessInstance = new ChessReq();





type PropsQuiz = {};

function Quiz({}: PropsQuiz) {
  
  const dispatch = useDispatch();
  const fen = useSelector((state: StateRoot)=>state.status.current.quiz.fen);

  const gameCurrent:ChessInstance = useMemo(()=>{
    const result = new ChessReq(); 
    return result; 
  }, []);

  const move = useCallback(
    (from: string, to: string)=>{
      const result = gameCurrent.move({from: from as Square, to: to as Square});
      if (result){
        dispatch( actions.status.return__REPLACE({
          listKey: ['current', 'quiz', 'fen'],
          replacement: gameCurrent.fen()
      }) );
      }
  }, [gameCurrent]);


  const loadFen = useCallback(
    (fen: string)=>{
      const result = gameCurrent.load(fen);
      if (result){
        dispatch( actions.status.return__REPLACE({
          listKey: ['current', 'quiz', 'fen'],
          replacement: gameCurrent.fen()
      }) );
      }
  }, [gameCurrent]);

  const listSquare = useMemo(()=>{
    return gameCurrent.board(); 
  }, [fen, gameCurrent]);

  return (
    <div>
      <ChessBoard
        move={move}
        listSquare={listSquare}
      />
      <ToolBar 
        loadFen={loadFen}
      />
    </div>
  );
}

export default Quiz;



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