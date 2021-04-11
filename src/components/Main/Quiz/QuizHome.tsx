import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import Loading from 'components/Global/Loading';

//import actionsRoot from 'store/actions';

//import Portal from './QuizHome/Portal';

import styles from './QuizHome.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsQuizHome = {};

function QuizHome({}: PropsQuizHome) {
  
  const dispatch = useDispatch();     
  // const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
  // const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);

  //const idUser = useSelector((state: StateRoot) => state.auth.user?.id);


  const onClick_MainButton = useCallback(
    (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      const value = e.currentTarget.value;
      if (value === 'random'){
        // history.push(`/quiz/${'random'}`)
      }
      else if (value === 'create'){
        history.push('/quiz/create')
      }
  }, [history]);

  return (

    <div className={`${styles['root']}`} >

        <div>
          <button
            type='button'
            value='random'
            onClick={onClick_MainButton}
          >
            random quiz
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
    </div>
  );
}

QuizHome.defaultProps = {};

export default QuizHome;

