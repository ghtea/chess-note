import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';
import chessFocusing from 'chessApp';

import * as clipboardy from 'clipboardy';
import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

// https://github.com/STRML/react-draggable

//import IconGraph from 'svgs/basic/IconChartBar';

import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './ToolBarQE.module.scss';
import IconPaste from 'svgs/basic/IconSignIn';
import IconAngle from "svgs/basic/IconAngle";
import IconOthers from "svgs/basic/IconThreeDots";
import IconArrowToEnd from "svgs/basic/IconArrowToEnd";
// import {Chess} from 'chess.js'; // => makes error

type PropsToolBarQE = {
};

function ToolBarQE({
}: PropsToolBarQE) {

    const dispatch = useDispatch();

    const heightToolbar = useSelector((state: StateRoot)=>state.present.size.document.chessBoard.toolBar.height);
    const lengthChessBoard = useSelector((state: StateRoot)=>state.present.size.document.chessBoard.length);
    const quizPresent = useSelector((state: StateRoot)=>state.present.quiz);


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
            if (value === 'create'){
                dispatch(actions.appearance.return__REPLACE({ 
                    listKey: ['showing', 'modal', 'quizEditingUpload'],
                    replacement: true,
                }));
            }
            else if (value === 'back-to-start'){
                dispatch(actions.data.quiz.return__BACK_TO_START());
            }
            else if (value === 'forward'){
                
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
                className={`${styles['mode']}`}
            >
                <button
                    value='create'
                    type='button'
                    onClick={onClick_Main}
                > 
                    <FormattedMessage id={'Global.Create'} /> 
                </button>
            </div>


            <div
                className={`${styles['control']}`}
            >
                <button
                    type='button'
                    value='backward'
                    aria-label='backward'
                    onClick={onClick_Main}
                >
                    <IconAngle className={`${styles['icon__backward']}`} kind='light' directon='left'/>
                </button>

                <button
                    type='button'
                    value='forward'
                    aria-label='forward'
                    onClick={onClick_Main}
                >
                    <IconAngle className={`${styles['icon__forward']}`} kind='light' directon='right'/>
                </button>
            </div>


            <div
                className={`${styles['save']}`}
            >
                <button
                    type='button'
                    value='save'
                    onClick={onClick_Main}
                >
                    <FormattedMessage id={'Global.Save'} />   
                </button>
            </div>


            <div
                className={`${styles['others']}`}
            >
                <button
                    type='button'
                    value='others'
                    aria-label='others'
                    onClick={onClick_Main}
                >
                    <IconOthers className={`${styles['icon__others']}`} kind='regular' />
                </button>
            </div>
            
        </div>
    );
}

ToolBarQE.defaultProps = {};

export default ToolBarQE;

