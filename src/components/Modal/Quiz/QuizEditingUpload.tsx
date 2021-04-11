import React, { useCallback, useEffect, useRef, useMemo } from "react";
import { firebaseAuth } from "firebaseApp";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
import Cookies from 'js-cookie';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actions  from 'store/actions';

import useInputQuizEditingUpload from './QuizEditingUpload/useInputQuizEditingUpload';
import convertCase from 'tools/vanilla/convertCase';
import IconX from 'svgs/basic/IconX';

import styles from './QuizEditingUpload.module.scss';
import stylesModal from 'components/Modal.module.scss';
import InputText from "components/Global/Input/InputText";
import InputRadio from "components/Global/Input/InputRadio";


type PropsQuizEditingUpload = {};

function QuizEditingUpload({}: PropsQuizEditingUpload) {
  
    const dispatch = useDispatch();
    const intl = useIntl();
    
    const {draft: draft_Main, onChange: onChange_Main} = useInputQuizEditingUpload({
        name: '',
        isPublic: true,
    });

    const quizFocusing = useSelector((state: StateRoot) => state.data.quiz.focusing);
    
    const refModal = useRef<HTMLDivElement>(null);
    const onClick_Window = useCallback(
        (event:MouseEvent)=> {   
            if ( !refModal.current?.contains(event.target as Node)){
                dispatch(actions.status.return__REPLACE({ 
                    listKey: ['showing', 'modal', convertCase("QuizEditingUpload", 'camel')],
                    replacement: false
                }));
            } 
        },[refModal]
    ); 
    useEffect(()=>{  // close sub menu when click outside of menu
        window.addEventListener('click', onClick_Window);
        return () => window.removeEventListener('click', onClick_Window);
    },[onClick_Window]);


    const onClick_Create = useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            dispatch(actions.data.quiz.return__CREATE_QUIZ({ 
                name: quizFocusing.name,
                side: quizFocusing.side,
                fenStart: quizFocusing.fenStart,
                listListMoveCorrect: quizFocusing.listListMoveCorrect,
                idUser: quizFocusing.idUser,
                isPublic: quizFocusing.isPublic,
            }));
            dispatch(actions.status.return__REPLACE({ 
                listKey: ['showing', 'modal', convertCase("QuizEditingUpload", 'camel')],
                replacement: false
            }));
    }, [quizFocusing]);
  
  return (
    <div 
        className={`${styles['root']} ${stylesModal['root']}`} 
    >
        <div
            className={`${stylesModal['outside']}`}
            aria-label="Outside Put"
        />

        <div 
            className={`${stylesModal['modal']} ${styles['modal']}`}
            role="dialog" aria-labelledby="Heading_Put"
            ref={refModal}
        >
        
            <div 
                className={`${stylesModal['content']} ${styles['content']}`} 
            >
                
                <div className={`${stylesModal['content__section']} ${styles['input-name']}`} >
                    <InputText 
                        name='name'
                        value={quizFocusing.name}

                        label={intl.formatMessage({ id: 'Global.Name'})}
                        placeholder={intl.formatMessage({ id: 'Global.Name'})}
                        required={false}

                        onChange={onChange_Main}
                    />
                </div>


                <div className={`${stylesModal['content__section']}`} >
                    <h3>  <FormattedMessage id={`Modal.QuizEditingUpload_IsPublic`} /></h3>
 
                    <div className={'container__input-radio'} > 
                        <InputRadio 
                            valueCurrent={draft_Main.isPublic}

                            name='isPublic'
                            value={true}
                            label={intl.formatMessage({ id: 'Modal.QuizEditingUpload_Public'})}
                            onChange={onChange_Main}
                        />
                        <InputRadio 
                            valueCurrent={draft_Main.isPublic}

                            name='isPublic'
                            value={false}
                            label={intl.formatMessage({ id: 'Modal.QuizEditingUpload_Private'})}
                            onChange={onChange_Main}
                        />
                    </div>
                </div>


                <div className={`${stylesModal['content__section']}`} >
                    <button
                        type='button'
                        value='create'
                        className={`${styles['button__put']}`}
                        onClick={onClick_Create}
                    > <FormattedMessage id={`Global.Create`} /> </button>
                </div>
                
            </div>
        
        </div>
    </div>
    
  );
}

QuizEditingUpload.defaultProps = {};

export default QuizEditingUpload;


