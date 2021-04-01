import React, { useCallback, useEffect, useRef, useMemo } from "react";
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
import IconX from 'svgs/basic/IconX';

import styles from './QuizSave.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsQuizSave = {};

function QuizSave({}: PropsQuizSave) {
  
    const dispatch = useDispatch();

    //const languageCurrent:string = useSelector((state: StateRoot) => state['status']['current']['language']);
    
    const refModal = useRef<HTMLDivElement>(null);
    const onClick_Window = useCallback(
        (event:MouseEvent)=> {   
            if ( !refModal.current?.contains(event.target as Node)){
                dispatch(actions.status.return__REPLACE({ 
                    listKey: ['showing', 'modal', convertCase("QuizSave", 'camel')],
                    replacement: false
                }));
            } 
        },[refModal]
    ); 
    useEffect(()=>{  // close sub menu when click outside of menu
        window.addEventListener('click', onClick_Window);
        return () => window.removeEventListener('click', onClick_Window);
    },[onClick_Window]);


    const onClick_AnyButton = useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            
    }, []);
  
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
                        onClick={onClick_AnyButton}
                    > <FormattedMessage id={`Modal.QuizSave_SaveAsStart`} /> </button>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <button
                        type='button'
                        value='current-answer'
                        className={`${styles['button__current-answer']}`}
                        onClick={onClick_AnyButton}
                    > <FormattedMessage id={`Modal.QuizSave_SaveAsCurrentAnswer`} /> </button>
                </div>
                
                <div className={`${stylesModal['content__section']}`} >
                    <button
                        type='button'
                        value='new-answer'
                        className={`${styles['button__new-answer']}`}
                        onClick={onClick_AnyButton}
                    > <FormattedMessage id={`Modal.QuizSave_SaveAsNewAnswer`} /> </button>
                </div>
            </div>
        
        </div>
    </div>
    
  );
}

QuizSave.defaultProps = {};

export default QuizSave;


