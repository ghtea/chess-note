import React, { useCallback, useEffect, useRef, useMemo, useState } from "react";
import { firebaseAuth } from "firebaseApp";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actions  from 'store/actions';

import InputRadio from 'components/Global/Input/InputRadio';
import convertCase from 'tools/vanilla/convertCase';
import IconAngle from 'svgs/basic/IconAngle';

import styles from './QuizEditingSave.module.scss';
import stylesQEC from './QuizEditingCommon.module.scss';
import stylesModal from 'components/Modal.module.scss';


import { treeMove } from "chessApp";


type PropsQuizEditingSave = {
    top: number;
};

function QuizEditingSave({
    top
}: PropsQuizEditingSave) {
  
    const dispatch = useDispatch();

    const quizPresent = useSelector((state: StateRoot) => state.present.quiz);
    const quizFocusing = useSelector((state: StateRoot) => state.data.quiz.focusing);
    const [indexAnswer, setIndexAnswer] = useState<number>(0);

    const refModal = useRef<HTMLDivElement>(null);
    const onClick_Window = useCallback(
        (event:MouseEvent)=> {   
            if ( !refModal.current?.contains(event.target as Node)){
                dispatch(actions.appearance.return__REPLACE({ 
                    listKey: ['showing', 'modal', convertCase("QuizEditingSave", 'camel')],
                    replacement: false
                }));
            } 
        },[refModal]
    ); 
    useEffect(()=>{  // close sub menu when click outside of menu
        window.addEventListener('click', onClick_Window);
        return () => window.removeEventListener('click', onClick_Window);
    },[onClick_Window]);


    const onClick_AnyMainButton = useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

            const value = e.currentTarget.value;
            dispatch(actions.appearance.return__REPLACE({ 
                listKey: ['showing', 'modal', convertCase("QuizEditingSave", 'camel')],
                replacement: false
            }));


            if (value === 'start'){
                dispatch(actions.data.return__REPLACE({ 
                    listKey: [ 'quiz', 'focusing', 'fenStart' ],
                    replacement: quizPresent.fen
                }));
                dispatch(actions.present.return__REPLACE({ 
                    listKey: [ 'quiz', 'seriesSan' ],
                    replacement: [],
                }));
            }
            else if (value === 'answer'){
                treeMove.putSeriesSan(quizPresent.seriesSan);
                dispatch(actions.data.return__REPLACE({ 
                    listKey: [ 'quiz', 'focusing', 'listSeriesSanCorrect' ],
                    replacement: treeMove.returnListSeriesSan(),
                }));
            } 
        
    }, [quizPresent.seriesSan, quizFocusing.listSeriesSanCorrect]);
    


  return (
    <div 
        className={`${styles['root']} ${stylesQEC['root']} ${stylesModal['root']}`} 
    >
        <div
            className={`${stylesModal['outside']}`}
            aria-label="Outside Save"
        />

        <div 
            className={`${styles['modal']} ${stylesQEC['modal']} ${stylesModal['modal']}`}
            role="dialog" aria-labelledby="Heading_Save"
            ref={refModal}
            style={{top: top}}
        >
        
            <div 
                className={`${stylesModal['content']} ${stylesQEC['content']} ${styles['content']}`} 
            >
                
                <div className={`${stylesModal['content__section']}`} >
                    <button
                        type='button'
                        value='start'
                        className={`${styles['button__start']}`}
                        onClick={onClick_AnyMainButton}
                    > <FormattedMessage id={`Modal.QuizEditingSave_SaveAsStart`} /> </button>
                </div>


                <div className={`${stylesModal['content__section']}`} >
                    <button
                        type='button'
                        value='answer'
                        className={`${styles['button__answer']}`}
                        onClick={onClick_AnyMainButton}
                    > <FormattedMessage id={`Modal.QuizEditingSave_SaveAsAnswer`} /> </button>
                </div>

            </div>
        
        </div>
    </div>
    
  );
}

QuizEditingSave.defaultProps = {};

export default QuizEditingSave;


