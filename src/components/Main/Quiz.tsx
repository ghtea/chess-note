import ChessBoard from 'components/Global/ChessBoard';
import React, { useCallback, useState, useMemo, useEffect} from 'react';
import { Route, Switch } from "react-router-dom";

//import { useQuery, gql } from '@apollo/client';

import { useDispatch, useSelector } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions  from 'store/actions';

import QuizEditing from './Quiz/QuizEditing';
import QuizHome from './Quiz/QuizHome';
import QuizPlaying from './Quiz/QuizPlaying';


type PropsQuiz = {};

function Quiz({}: PropsQuiz) {
  
  const dispatch = useDispatch();

  // const readyUser = useSelector((state: StateRoot) => state.status.auth.user.ready);
  // const idUser = useSelector((state: StateRoot) => state.auth.user?.id);
  // const idQuizFocusing = useSelector((state: StateRoot) => state.data.quiz.focusing.id);

  const situationCurrent = useSelector((state: StateRoot) => state.present.quiz.focusing.situation);
  


  useEffect(()=>{
    dispatch(actions.data.quiz.return__WATCH_FEN_START_CHANGE()); 
  }, [])


  useEffect(()=>{
    // 중요!, 정규표현식 더 공부...
    const modeFromUrl = window.location.pathname.replace(/\/quiz\/([^/]*).*/, "$1");
    //console.log('modeFromUrl: ', modeFromUrl)
    let situationNew = '';

    if (modeFromUrl === 'create'){
      situationNew = 'creating';
    }
    else if (modeFromUrl === 'edit'){
      situationNew = 'editing';
    }
    else if (modeFromUrl === 'play'){
      situationNew = 'playing';
    }
    else if (modeFromUrl === 'solved'){
      situationNew = 'solved';
    }
    if (situationCurrent !== situationNew){
      dispatch(actions.present.return__REPLACE({ 
        listKey: [ 'quiz', 'focusing', 'situation' ],
        replacement: situationNew,
      })); 
    }
    
    // console.log(idQuiz)
    //console.log(window.location.pathname)
  },[window.location.pathname]);


  




  return (
    <Switch>
      <Route exact path="/quiz" >
          <QuizHome />
      </Route>

      <Route path="/quiz/create" >
          <QuizEditing />
      </Route>

      <Route path="/quiz/edit" >
          <QuizEditing />
      </Route>

      <Route path="/quiz/play/:idQuiz" >
          <QuizPlaying />
      </Route>

    </Switch>
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