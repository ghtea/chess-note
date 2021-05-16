import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actions  from 'store/actions';

import Loading from 'components/Global/Loading';

//import actionsRoot from 'store/actions';

//import Portal from './QuizHome/Portal';

import styles from './QuizHome.module.scss';
import { KindGetFocusListQuiz } from "store/types/data/quiz";
import ShortCuts from "./QuizHome/ShortCuts";
import DisplayQuiz from "./QuizHome/DisplayQuiz";
// import IconSort from 'svgs/basic/IconSort';
type PropsQuizHome = {};

function QuizHome({}: PropsQuizHome) {
  
  const dispatch = useDispatch();     
  const readyUser = useSelector((state: StateRoot) => state.status.auth.user.ready);
  const idUser = useSelector((state: StateRoot) => state.auth.user?.id);

  useEffect(()=>{
    
    dispatch(actions.data.quiz.return__GET_DICT_LIST_QUIZ({ 
      idUser: idUser,
    }));  
        
  }, [])


  return (

    <div className={`${styles['root']}`} >

      <ShortCuts />
        
      <DisplayQuiz />
        
    </div>
  );
}

QuizHome.defaultProps = {};

export default QuizHome;

