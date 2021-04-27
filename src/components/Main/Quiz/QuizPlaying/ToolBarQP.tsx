import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';
import * as clipboardy from 'clipboardy';
import { FormattedMessage } from 'react-intl';
import chessFocusing from 'chessApp';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

// https://github.com/STRML/react-draggable

//import IconGraph from 'svgs/basic/IconChartBar';

import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './ToolBarQP.module.scss';
import IconPaste from 'svgs/basic/IconSignIn';
import IconAngle from "svgs/basic/IconAngle";
import IconOthers from "svgs/basic/IconThreeDots";
import IconArrowToEnd from "svgs/basic/IconArrowToEnd";
import IconBookSpell from "svgs/basic/IconBookSpell";
import IconArrowInSquare from "svgs/basic/IconArrowInSquare";
// import {Chess} from 'chess.js'; // => makes error

type PropsToolBarQP = {
};

function ToolBarQP({
}: PropsToolBarQP) {

    const dispatch = useDispatch();

    const heightToolbar = useSelector((state: StateRoot)=>state.appearance.layout.document.chessBoard.toolBar.height);
    const lengthChessBoard = useSelector((state: StateRoot)=>state.appearance.layout.document.chessBoard.length);
    const statusQuiz = useSelector((state: StateRoot)=>state.present.quiz);

    const situation = useSelector((state: StateRoot)=>state.present.quiz.situation);

    // const [positionStart, setPositionStart] = useState<null | string>(null);
    // const onClick_ControlPaste = useCallback(
    //     async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    //         try { 
    //             const value = await clipboardy.read();
    //             //console.log(value)
    //             loadFen(value)
    //         }
    //         catch (e){

    //         }
    // }, []);



    const onClick_Main = useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            const value = e.currentTarget.value;
            if (value === 'back-to-start'){
                dispatch(actions.data.quiz.return__BACK_TO_START());
            }
            else if (value === 'save'){
                dispatch(actions.appearance.return__REPLACE({ 
                    listKey: ['showing', 'modal', 'quizEditingSave'],
                    replacement: true,
                }));
            }
            else if (value==='others'){
                dispatch(actions.appearance.return__REPLACE({ 
                    listKey: ['showing', 'modal', 'quizEditingOthers'],
                    replacement: true,
                }));
            }

            
    }, []);


    return (
        <div 
            className={`${styles['root']}`}
            style={{
                width: lengthChessBoard,
                height: heightToolbar,
            }}
        >

            <div
                className={`${styles['back-to-start']}`}
            >
                <button
                        type='button'
                        value='back-to-start'
                        aria-label='back to start'
                        onClick={onClick_Main}
                    >
                    <IconArrowToEnd className={`${styles['icon__back-to-start']}`} kind='regular' direction='left' />
                </button>
            </div>

            <div
                className={`${styles['...']}`}
            >
            </div>

            
            <div
                className={`${styles['show-answer']}`}
            >
                <button
                        type='button'
                        value='show-answer'
                        aria-label='show answer'
                        onClick={onClick_Main}
                    >
                    <IconBookSpell className={`${styles['icon__show-answer']}`} kind='regular'/>

                </button>
            </div>

            

            <div
                className={`${styles['...']}`}
            >
            </div>

            <div
                className={`${styles['another-quiz']}`}
            >
                {(situation === 'solved' || situation === 'failed') &&
                    <button
                        type='button'
                        value='another-quiz'
                        aria-label='another quiz'
                        onClick={onClick_Main}
                    >
                        <IconArrowInSquare className={`${styles['icon__another-quiz']}`} kind='solid' direction='right' />
                    </button>
                }
            </div>
            
        </div>
    );
}

ToolBarQP.defaultProps = {};

export default ToolBarQP;

