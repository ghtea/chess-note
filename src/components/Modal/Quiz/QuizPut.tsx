import React, { useCallback, useEffect, useRef, useMemo } from "react";
import { firebaseAuth } from "firebaseApp";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
import Cookies from 'js-cookie';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actions  from 'store/actions';

import useInputBasic from 'tools/hooks/useInputBasic';
import convertCase from 'tools/vanilla/convertCase';
import IconX from 'svgs/basic/IconX';

import styles from './QuizPut.module.scss';
import stylesModal from 'components/Modal.module.scss';
import InputText from "components/Global/Input/InputText";


type PropsQuizPut = {};

function QuizPut({}: PropsQuizPut) {
  
    const dispatch = useDispatch();
    const intl = useIntl();
    
    const {draft: draft_Main, onChange: onChange_Main} = useInputBasic({
        name: '',
    });

    //const languageCurrent:string = useSelector((state: StateRoot) => state['status']['current']['language']);
    
    const refModal = useRef<HTMLDivElement>(null);
    const onClick_Window = useCallback(
        (event:MouseEvent)=> {   
            if ( !refModal.current?.contains(event.target as Node)){
                dispatch(actions.status.return__REPLACE({ 
                    listKey: ['showing', 'modal', convertCase("QuizPut", 'camel')],
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
                name: 'goddddd',
                side: 'white',
                fenStart: 'fen...',
                listListMoveCorrect: [[]],
                idUser: 'user',
            }));
    }, []);
  
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
                        value={draft_Main.name}

                        label={intl.formatMessage({ id: 'Global.Name'})}
                        placeholder={intl.formatMessage({ id: 'Global.Name'})}
                        required={false}

                        onChange={onChange_Main}
                    />
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

QuizPut.defaultProps = {};

export default QuizPut;


