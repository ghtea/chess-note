import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';
import * as clipboardy from 'clipboardy';
import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

// https://github.com/STRML/react-draggable

//import IconGraph from 'svgs/basic/IconChartBar';

import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './ToolBarPlaying.module.scss';
import IconPaste from 'svgs/basic/IconSignIn';
import IconAngle from "svgs/basic/IconAngle";
import IconOthers from "svgs/basic/IconThreeDots";
// import {Chess} from 'chess.js'; // => makes error

type PropsToolBarPlaying = {
};

function ToolBarPlaying({
}: PropsToolBarPlaying) {

    const dispatch = useDispatch();

    const heightToolbar = useSelector((state: StateRoot)=>state.present.size.document.chessBoard.toolBar.height);
    const lengthChessBoard = useSelector((state: StateRoot)=>state.present.size.document.chessBoard.length);
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
            if (value === 'create'){
                dispatch(actions.appearance.return__REPLACE({ 
                    listKey: ['showing', 'modal', 'quizEditingUpload'],
                    replacement: true,
                }));
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
                className={`${styles['show-answer']}`}
            >
                {situation==='playing' ?
                    <button
                        type='button'
                        value='give-up'
                        onClick={onClick_Main}
                    >
                        give up
                        {/* <FormattedMessage id={'Global.Save'} />    */}
                    </button>
                    :
                    <button
                        type='button'
                        value='show-answer'
                        onClick={onClick_Main}
                    >
                        show answer
                        {/* <FormattedMessage id={'Global.Save'} />    */}
                    </button>
                }
            </div>

            <div
                className={`${styles['control']}`}
            >
                {/* <button>
                    <IconAngle className={`${styles['icon__backward']}`} kind='light' directon='left'/>
                </button>

                <button>
                    <IconAngle className={`${styles['icon__forward']}`} kind='light' directon='right'/>
                </button> */}
            </div>

            <div
                className={`${styles['another-quiz']}`}
            >
                {situation==='solved' &&
                    <button
                        type='button'
                        value='another-quiz'
                        onClick={onClick_Main}
                    >
                        another-quiz
                        {/* <FormattedMessage id={'Global.Save'} />    */}
                    </button>
                }
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

ToolBarPlaying.defaultProps = {};

export default ToolBarPlaying;

