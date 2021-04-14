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

import styles from './ToolBarEditing.module.scss';
import IconPaste from 'svgs/basic/IconSignIn';
import IconAngle from "svgs/basic/IconAngle";
import IconOthers from "svgs/basic/IconThreeDots";
// import {Chess} from 'chess.js'; // => makes error

type PropsToolBarEditing = {
};

function ToolBarEditing({
}: PropsToolBarEditing) {

    const dispatch = useDispatch();

    const heightToolbar = useSelector((state: StateRoot)=>state.status.current.size.document.chessBoard.toolbar.height);
    const lengthChessBoard = useSelector((state: StateRoot)=>state.status.current.size.document.chessBoard.length);
    const statusQuiz = useSelector((state: StateRoot)=>state.status.current.quiz);


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
                dispatch(actions.status.return__REPLACE({ 
                    listKey: ['showing', 'modal', 'quizEditingUpload'],
                    replacement: true,
                }));
            }
            else if (value === 'backward'){
                dispatch(actions.status.return__REPLACE({ 
                    listKey: ['showing', 'modal', 'quizEditingSave'],
                    replacement: true,
                }));
            }
            else if (value === 'forward'){
                

                // dispatch(actions.status.return__REPLACE({ 
                //     listKey: ['showing', 'modal', 'quizEditingSave'],
                //     replacement: true,
                // }));
            }
            else if (value === 'save'){
                // dispatch(actions.status.return__REPLACE({ 
                //     listKey: ['showing', 'modal', 'quizEditingSave'],
                //     replacement: true,
                // }));
            }
            else if (value==='others'){
                dispatch(actions.status.return__REPLACE({ 
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
                className={`${styles['back']}`}
            >
                <span>
                    <FormattedMessage 
                        id={
                            statusQuiz.turn==='white' ?
                            'Global.WhiteToMove'
                            :
                            'Global.BlackToMove'
                        } 
                    />
                </span>
            </div>

            <div
                className={`${styles['mode']}`}
            >
                <button
                    value='create'
                    type='button'
                    onClick={onClick_Main}
                > <FormattedMessage id={'Global.Create'} /> 
                </button>
            </div>

            <div
                className={`${styles['control']}`}
            >
                <button
                    type='button'
                    value='backward'
                    onClick={onClick_Main}
                >
                    <IconAngle className={`${styles['icon__backward']}`} kind='light' directon='left'/>
                </button>

                <button
                    type='button'
                    value='forward'
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
                    onClick={onClick_Main}
                >
                    <IconOthers className={`${styles['icon__others']}`} kind='regular' />
                </button>
            </div>
            
        </div>
    );
}

ToolBarEditing.defaultProps = {};

export default ToolBarEditing;

