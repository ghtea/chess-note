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
import { KindGetListQuiz } from "store/types/data/quiz";
// import IconSort from 'svgs/basic/IconSort';
type PropsQuizHome = {};

function QuizHome({}: PropsQuizHome) {
  
  const dispatch = useDispatch();     
  const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
  // const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);

  const idUser = useSelector((state: StateRoot) => state.auth.user?.id);


  const onClick_MainButton = useCallback(
    (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      const value = e.currentTarget.value;
      if (value === 'play-public-random-quiz'){
        if (readyUser && idUser){
          dispatch(actions.data.quiz.return__GET_LIST_QUIZ({
            kind: KindGetListQuiz.publicQuizByRecord,
            idUser: idUser,
          }));
        }
        else {
          dispatch(actions.data.quiz.return__GET_LIST_QUIZ({
            kind: KindGetListQuiz.publicQuiz
          }));
        }
      }
      else if (value === 'play-my-random-quiz'){
        if (readyUser && idUser){
          dispatch(actions.data.quiz.return__GET_LIST_QUIZ({
            kind: KindGetListQuiz.myQuizByRecord,
            idUser: idUser,
          }));
        }
      }
      else if (value === 'create'){
        history.push('/quiz/create')
      }
  }, [history, readyUser, idUser]);

  return (

    <div className={`${styles['root']}`} >

        <div>
          <button
            type='button'
            value='play-public-random-quiz'
            onClick={onClick_MainButton}
          >
            random public quiz
          </button>
        </div>

        {readyUser &&
          <>

            <div>
              <button
                type='button'
                value='play-my-random-quiz'
                onClick={onClick_MainButton}
              >
                random my quiz
              </button>
            </div>
            <div>
              <button
                type='button'
                value='create'
                onClick={onClick_MainButton}
              >
                create
              </button>
            </div>

          </>
        }
        
    </div>
  );
}

QuizHome.defaultProps = {};

export default QuizHome;

