import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import chess from 'chess';

// https://github.com/STRML/react-draggable

//import IconGraph from 'svgs/basic/IconChartBar';

import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './ChessBoard.module.scss';
import ChessSquare from "./ChessBoard/ChessSquare";
// import IconSort from 'svgs/basic/IconSort';



type PropsChessBoard = {
};

function ChessBoard({}: PropsChessBoard) {

    const dispatch = useDispatch();
    const leagueStandings = useSelector((state: StateRoot)=>state.data.football.leagueStandings);

    const sorting = useSelector((state: StateRoot)=>state.status.current.football.leagueStandings.sorting);

    const gameCurrent = useMemo(()=>{
        return chess.create(); 
    }, []);


    const onClick_ChangeMode = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {value} = event.currentTarget;

        dispatch(actions.status.return__REPLACE({ 
            listKey: ['current', 'football', 'leagueStandings', 'mode', 'element'],
            replacement: value
        }));
    
        },[]
    );

    useEffect(()=>{

    });

    
    
    

    return (
        <div className={`${styles['root']}`}>
            {gameCurrent.getStatus()['board']['squares'].map((e,i)=>{
                return (
                    <ChessSquare 
                        status={e}
                        key={`ChessSquare-${i}`}
                    />
                )
            })}
        </div>
    );
}

ChessBoard.defaultProps = {};

export default ChessBoard;

