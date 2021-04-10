import React, { useCallback, useEffect, useRef, useMemo, useState } from "react";
import { firebaseAuth } from "firebaseApp";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import * as clipboardy from 'clipboardy';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actions  from 'store/actions';

import InputRadio from 'components/Global/Input/InputRadio';
import convertCase from 'tools/vanilla/convertCase';
import IconAngle from 'svgs/basic/IconAngle';

import styles from './QuizEditingOthers.module.scss';
import stylesQEC from './QuizEditingCommon.module.scss';

import stylesModal from 'components/Modal.module.scss';


type PropsQuizEditingOthers = {};

function QuizEditingOthers({}: PropsQuizEditingOthers) {
  
    const dispatch = useDispatch();

    const statusQuiz = useSelector((state: StateRoot) => state.status.current.quiz);
    const quizFocusing = useSelector((state: StateRoot) => state.data.quiz.focusing);
    const [indexAnswer, setIndexAnswer] = useState<number>(0);

    const refModal = useRef<HTMLDivElement>(null);
    const onClick_Window = useCallback(
        (event:MouseEvent)=> {   
            if ( !refModal.current?.contains(event.target as Node)){
                dispatch(actions.status.return__REPLACE({ 
                    listKey: ['showing', 'modal', convertCase("QuizEditingOthers", 'camel')],
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
        async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            const value = e.currentTarget.value;
            //console.log(value)
            if (value === 'use-fen'){
                const value = await clipboardy.read();
                dispatch(actions.status.return__REPLACE({ 
                    listKey: [ 'current', 'quiz', 'fenToLoad' ],
                    replacement: value, 
                }));
            }
            else if (value === 'change-side'){
                dispatch(actions.data.return__REPLACE({ 
                    listKey: [ 'quiz', 'focusing', 'side' ],
                    replacement: quizFocusing.side === 'white' ? 'black' : 'white', 
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
    }, [statusQuiz.listMove, quizFocusing]);
    

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
        className={`${stylesQEC['root']} ${stylesModal['root']}`} 
    >
        <div
            className={`${stylesModal['outside']}`}
            aria-label="Outside Save"
        />

        <div 
            className={`${stylesModal['modal']} ${stylesQEC['modal']}`}
            role="dialog" aria-labelledby="Heading_Save"
            ref={refModal}
        >
        
            <div 
                className={`${stylesModal['content']} ${stylesQEC['content']}`} 
            >
                <div className={`${stylesModal['content__section']}`} >
                    <button
                        type='button'
                        value='use-fen'
                        className={`${styles['button__use-fen']} ${stylesQEC['button__basic']}`}
                        onClick={onClick_AnyMainButton}
                    > <FormattedMessage id={`Modal.QuizEditingOthers_UseFen`} /> </button>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <button
                        type='button'
                        value='change-side'
                        className={`${styles['button__change-side']} ${stylesQEC['button__basic']}`}
                        onClick={onClick_AnyMainButton}
                    > <FormattedMessage id={`Modal.QuizEditingOthers_ChangeSide`} /> </button>
                </div>

                {quizFocusing.listListMoveCorrect.length === 0 &&
                    <div className={`${stylesModal['content__section']}`} >
                        <span
                            className={`${stylesQEC['span__basic']}`}
                        > 
                            <span>
                                <FormattedMessage id={`Modal.QuizEditingOthers_NoAnswer`} /> 
                            </span>
                        </span>
                    </div>
                }           


                {quizFocusing.listListMoveCorrect.length > 0 &&
                    <>
                    <div className={`${stylesModal['content__section']}`} >
                        <button
                            type='button'
                            value='show-answer'
                            className={`${styles['button__show-answer']} ${stylesQEC['button__basic']}`}
                            onClick={onClick_AnyMainButton}
                        > 
                            <FormattedMessage 
                                id={`Modal.QuizEditingOthers_ShowAnswer`} 
                                values={{index: `${(indexAnswer + 1)} / ${quizFocusing.listListMoveCorrect.length}`}}
                            /> 
                        </button>
                        <button
                            type='button'
                            value='previous-answer'
                            onClick={onClick_ButtonChangeAnswer}
                            className={`${stylesQEC['button__previous-answer']}`}
                        >
                            <IconAngle 
                                className={`${stylesQEC['icon__previous-answer']}`}
                                directon='left' kind='regular' 
                            />
                        </button>
                        <button
                            type='button'
                            value='next-answer'
                            onClick={onClick_ButtonChangeAnswer}
                            className={`${stylesQEC['button__next-answer']}`}
                        >
                            <IconAngle 
                                className={`${stylesQEC['icon__next-answer']}`}
                                directon='right' kind='regular' 
                            />
                        </button>
                    </div>

                    
                    <div className={`${stylesModal['content__section']}`} >
                        <button
                            type='button'
                            value='delete-answer'
                            className={`${styles['button__delete-answer']} ${stylesQEC['button__basic']}`}
                            onClick={onClick_AnyMainButton}
                        > 
                            <FormattedMessage 
                                id={`Modal.QuizEditingOthers_DeleteAnswer`} 
                                values={{index: `${(indexAnswer + 1)} / ${quizFocusing.listListMoveCorrect.length}`}}
                            /> 
                        </button>
                        <button
                            type='button'
                            value='previous-answer'
                            onClick={onClick_ButtonChangeAnswer}
                            className={`${stylesQEC['button__previous-answer']}`}
                        >
                            <IconAngle 
                                className={`${stylesQEC['icon__previous-answer']}`}
                                directon='left' kind='regular' 
                            />
                        </button>
                        <button
                            type='button'
                            value='next-answer'
                            onClick={onClick_ButtonChangeAnswer}
                            className={`${stylesQEC['button__next-answer']}`}
                        >
                            <IconAngle 
                                className={`${stylesQEC['icon__next-answer']}`}
                                directon='right' kind='regular' 
                            />
                        </button>
                    </div>
                    </>

                }

            </div>
        
        </div>
    </div>
    
  );
}

QuizEditingOthers.defaultProps = {};

export default QuizEditingOthers;

