import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'libraries/history';
import * as clipboardy from 'clipboardy';
import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

// https://github.com/STRML/react-draggable

//import IconGraph from 'svgs/basic/IconChartBar';

import * as actions  from 'store/actions'; 
import * as types  from 'store/types';

import stylesQP from '../QuizPlaying/StatusBarQP.module.scss';
import IconPaste from 'svgs/basic/IconSignIn';
import IconAngle from "svgs/basic/IconAngle";
import IconOthers from "svgs/basic/IconThreeDots";
// import {Chess} from 'chess.js'; // => makes error

type PropsStatusBarQE = {
};

function StatusBarQE({
}: PropsStatusBarQE) {

    const dispatch = useDispatch();

    const heightStatusBar = useSelector((state: StateRoot)=>state.appearance.layout.document.chessBoard.statusBar.height);
    const lengthChessBoard = useSelector((state: StateRoot)=>state.appearance.layout.document.chessBoard.length);
    
    const turn = useSelector((state: StateRoot)=>state.present.quiz.focusing.turn);
    const seriesSan = useSelector((state: StateRoot)=>state.present.quiz.focusing.seriesSan);




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
            className={`${stylesQP['root']}`}
            style={{
                width: lengthChessBoard,
                height: heightStatusBar,
            }}
        >
            
            <div className={`${stylesQP[`playing-${turn}`]}  ${stylesQP[`${turn}`]}`}>
                {turn === 'white' ?
                    <FormattedMessage id='Global.WhiteToMove' />
                    :
                    <FormattedMessage id='Global.BlackToMove' />
                }
                
            </div>

            {seriesSan.length > 0 && 
                <div className={`${stylesQP['series-san']}  ${stylesQP[`${turn}`]}`}>
                    {seriesSan.reduce((acc, cur)=>`${acc}, ${cur}`)}
                </div>
            }

            
        </div>
    );
}

StatusBarQE.defaultProps = {};

export default StatusBarQE;

