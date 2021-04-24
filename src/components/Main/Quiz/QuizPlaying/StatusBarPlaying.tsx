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

import styles from './StatusBarPlaying.module.scss';
import IconPaste from 'svgs/basic/IconSignIn';
import IconAngle from "svgs/basic/IconAngle";
import IconOthers from "svgs/basic/IconThreeDots";
// import {Chess} from 'chess.js'; // => makes error

type PropsStatusBarPlaying = {
};

function StatusBarPlaying({
}: PropsStatusBarPlaying) {

    const dispatch = useDispatch();

    const heightStatusBar = useSelector((state: StateRoot)=>state.present.size.document.chessBoard.statusBar.height);
    const lengthChessBoard = useSelector((state: StateRoot)=>state.present.size.document.chessBoard.length);
    
    const turn = useSelector((state: StateRoot)=>state.present.quiz.turn);
    const situation = useSelector((state: StateRoot)=>state.present.quiz.situation);




    const onClick_Main = useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            const value = e.currentTarget.value;
            // if (value === 'create'){
            //     dispatch(actions.appearance.return__REPLACE({ 
            //         listKey: ['showing', 'modal', 'quizEditingUpload'],
            //         replacement: true,
            //     }));
            // }
            
            
    }, []);


    return (
        <div 
            className={`${styles['root']}`}
            style={{
                width: lengthChessBoard,
                height: heightStatusBar,
            }}
        >
            {situation === 'playing' && 
                turn === 'white' ? 
                    <div className={`${styles['playing-white']}`}>
                        <FormattedMessage id='Global.WhiteToMove' />
                    </div>
                    :
                    <div className={`${styles['playing-black']}`}>
                        <FormattedMessage id='Global.BlackToMove' />
                    </div>
            }

            {situation === 'failed' && 
                <div className={`${styles['failed']}`}>
                    <FormattedMessage id='Global.WhiteToMove' />
                </div>
            }

            {situation === 'solved' && 
                <div className={`${styles['solved']}`}>
                    <FormattedMessage id='Global.WhiteToMove' />
                </div>
            }
            
        </div>
    );
}

StatusBarPlaying.defaultProps = {};

export default StatusBarPlaying;

