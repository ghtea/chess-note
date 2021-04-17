import React, { useCallback, useEffect, useRef, useMemo, useState } from "react";
import { firebaseAuth } from "firebaseApp";

import history from 'historyApp';
import chessFocusing from 'chessApp';
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

    const quizPresent = useSelector((state: StateRoot) => state.present.quiz);
    const quizFocusing = useSelector((state: StateRoot) => state.data.quiz.focusing);
    const [indexAnswer, setIndexAnswer] = useState<number>(0);

    const refModal = useRef<HTMLDivElement>(null);
    const onClick_Window = useCallback(
        (event:MouseEvent)=> {   
            if ( !refModal.current?.contains(event.target as Node)){
                dispatch(actions.appearance.return__REPLACE({ 
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
            

            if (value === 'use-fen'){
                const valueFromClipboard = await clipboardy.read();
                const {valid} = chessFocusing.validate_fen(valueFromClipboard);

                if (valid){
                    chessFocusing.load(valueFromClipboard);
                    const turn = chessFocusing.turn() === 'w' ? 'white' : 'black';

                    dispatch(actions.data.return__REPLACE({ 
                        listKey: [ 'quiz', 'focusing', 'fenStart' ],
                        replacement: chessFocusing.fen(), 
                    }));

                    dispatch( actions.data.return__REPLACE({
                        listKey: ['quiz', 'focusing', 'side'],
                        replacement: turn,
                    }) );
                    dispatch( actions.present.return__REPLACE({
                        listKey: ['quiz', 'turn'],
                        replacement: turn,
                    }) );
                }
                else {
                    dispatch( actions.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'QuizEditingOthers_NotValidFen'
                    }) );
                }
                
            }
            else if (value === 'change-side'){
                dispatch(actions.data.return__REPLACE({ 
                    listKey: [ 'quiz', 'focusing', 'side' ],
                    replacement: quizFocusing.side === 'white' ? 'black' : 'white', 
                }));
            }
            else if (value === 'new-answer'){
                dispatch(actions.data.quiz.return__SAVE_LIST_SAN_MOVE_AS_ANSWER({ 
                    listSanMove: quizPresent.listSanMove
                }));
            } 
            else if (value === 'existing-answer'){
                dispatch(actions.data.quiz.return__SAVE_LIST_SAN_MOVE_AS_ANSWER({ 
                    listSanMove: quizPresent.listSanMove
                }));
                // let replacement = [...quizFocusing.listNodeMoveNextCorrect];
                // replacement[indexAnswer] = quizPresent.listSanMove;

                // dispatch(actions.data.return__REPLACE({ 
                //     listKey: [ 'quiz', 'focusing', 'listNodeMoveNextCorrect' ],
                //     replacement: replacement
                // }));
            } 
        
    }, [quizPresent.listSanMove, quizFocusing]);
    

    const onClick_ButtonChangeAnswer = useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

            const numberAnswer = quizFocusing.listNodeMoveNextCorrect.length;
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
            
            
    }, [quizFocusing.listNodeMoveNextCorrect.length, indexAnswer]);


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

                {quizFocusing.listNodeMoveNextCorrect.length === 0 &&
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


                { quizFocusing.listNodeMoveNextCorrect.length > 0 &&
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
                                values={{index: `${(indexAnswer + 1)} / ${quizFocusing.listNodeMoveNextCorrect.length}`}}
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
                                values={{index: `${(indexAnswer + 1)} / ${quizFocusing.listNodeMoveNextCorrect.length}`}}
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


