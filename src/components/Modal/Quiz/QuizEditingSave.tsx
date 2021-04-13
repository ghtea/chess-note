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
import stylesModal from 'components/Modal.module.scss';


type PropsQuizEditingSave = {};

function QuizEditingSave({}: PropsQuizEditingSave) {
  
    const dispatch = useDispatch();

    const statusQuiz = useSelector((state: StateRoot) => state.status.current.quiz);
    const quizFocusing = useSelector((state: StateRoot) => state.data.quiz.focusing);
    const [indexAnswer, setIndexAnswer] = useState<number>(0);

    const refModal = useRef<HTMLDivElement>(null);
    const onClick_Window = useCallback(
        (event:MouseEvent)=> {   
            if ( !refModal.current?.contains(event.target as Node)){
                dispatch(actions.status.return__REPLACE({ 
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
            dispatch(actions.status.return__REPLACE({ 
                listKey: ['showing', 'modal', convertCase("QuizEditingSave", 'camel')],
                replacement: false
            }));
            if (value === 'start'){
                dispatch(actions.data.return__REPLACE({ 
                    listKey: [ 'quiz', 'focusing', 'fenStart' ],
                    replacement: statusQuiz.fen
                }));
                dispatch(actions.status.return__REPLACE({ 
                    listKey: [ 'current', 'quiz', 'listMove' ],
                    replacement: [],
                }));
            }
            else if (value === 'new-answer'){
                const replacement = [...quizFocusing.listListMoveCorrect, statusQuiz.listMove];
                dispatch(actions.data.return__REPLACE({ 
                    listKey: [ 'quiz', 'focusing', 'listListMoveCorrect' ],
                    replacement,
                }));
            } 
            else if (value === 'existing-answer'){
                let replacement = [...quizFocusing.listListMoveCorrect];
                replacement[indexAnswer] = statusQuiz.listMove;

                dispatch(actions.data.return__REPLACE({ 
                    listKey: [ 'quiz', 'focusing', 'listListMoveCorrect' ],
                    replacement: replacement
                }));
            } 
        
    }, [statusQuiz.listMove, quizFocusing.listListMoveCorrect]);
    

    const onClick_ButtonChangeAnswer = useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

            const numberAnswer = quizFocusing.listListMoveCorrect.length;
            //console.log(numberAnswer)
            const value = e.currentTarget.value;
            let indexAnswerNew = indexAnswer;
            if (value === 'previous-answer'){
                indexAnswerNew--;
            }
            else {
                indexAnswerNew++;
            }

            setIndexAnswer( (indexAnswerNew+numberAnswer) % numberAnswer );
        

    }, [quizFocusing.listListMoveCorrect.length, indexAnswer]);


  return (
    <div 
        className={`${styles['root']} ${stylesModal['root']}`} 
    >
        <div
            className={`${stylesModal['outside']}`}
            aria-label="Outside Save"
        />

        <div 
            className={`${stylesModal['modal']} ${styles['modal']}`}
            role="dialog" aria-labelledby="Heading_Save"
            ref={refModal}
        >
        
            <div 
                className={`${stylesModal['content']} ${styles['content']}`} 
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
                        value='new-answer'
                        className={`${styles['button__new-answer']}`}
                        onClick={onClick_AnyMainButton}
                    > <FormattedMessage id={`Modal.QuizEditingSave_SaveAsNewAnswer`} /> </button>
                </div>

                {quizFocusing && quizFocusing.listListMoveCorrect.length > 0 &&
                    <div className={`${stylesModal['content__section']}`} >
                        <button
                            type='button'
                            value='existing-answer'
                            className={`${styles['button__existing-answer']}`}
                            onClick={onClick_AnyMainButton}
                        > 
                            <FormattedMessage 
                                id={`Modal.QuizEditingSave_SaveAsExistingAnswer`} 
                                values={{index: `${(indexAnswer + 1)} / ${quizFocusing.listListMoveCorrect.length}`}}
                            /> 
                        </button>
                        <button
                            type='button'
                            value='previous-answer'
                            onClick={onClick_ButtonChangeAnswer}
                            className={`${styles['button__previous-answer']}`}
                        >
                            <IconAngle 
                                className={`${styles['icon__previous-answer']}`}
                                directon='left' kind='regular' 
                            />
                        </button>
                        <button
                            type='button'
                            value='next-answer'
                            onClick={onClick_ButtonChangeAnswer}
                            className={`${styles['button__next-answer']}`}
                        >
                            <IconAngle 
                                className={`${styles['icon__next-answer']}`}
                                directon='right' kind='regular' 
                            />
                        </button>
                    </div>
                }

            </div>
        
        </div>
    </div>
    
  );
}

QuizEditingSave.defaultProps = {};

export default QuizEditingSave;


