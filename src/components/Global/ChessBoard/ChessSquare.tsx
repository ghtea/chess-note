import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import chess from 'chess';

// https://github.com/STRML/react-draggable

import IconPawn from 'svgs/chess/IconPawn';
import IconKnight from 'svgs/chess/IconKnight';
import IconBishop from 'svgs/chess/IconBishop';
import IconRook from 'svgs/chess/IconRook';
import IconQueen from 'svgs/chess/IconQueen';
import IconKing from 'svgs/chess/IconKing';

import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './ChessSquare.module.scss';
import { stat } from "node:fs";
// import IconSort from 'svgs/basic/IconSort';



type PropsChessSquare = {
    status: chess.Square 
};

function ChessSquare({
    status
}: PropsChessSquare) {
    
    const dispatch = useDispatch();
    //const leagueStandings = useSelector((state: StateRoot)=>state.data.football.leagueStandings);

    //const sorting = useSelector((state: StateRoot)=>state.status.current.football.leagueStandings.sorting);

    const {file, rank, piece, typeSquare} = useMemo(()=>{

        const result: any = {...status};
        if (['a', 'c', 'e', 'g'].includes(status.file)){
            result.typeSquare = status.rank % 2 === 0 ? 'light' : 'dark'
        }
        else {
            result.typeSquare = status.rank % 2 === 0 ? 'dark' : 'light'
        }
        return result; 
    }, [status]);


    const svgPiece = useMemo(()=>{
        if (!piece){
            return null;
        }
        else if (piece.type === 'pawn'){
            return <IconPawn className={`piece-pawn`} kind='solid'/>
        }
        else if (piece.type === 'knight'){
            return <IconKnight className={`piece-knight`} kind='solid'/>
        }
        else if (piece.type === 'bishop'){
            return <IconBishop className={`piece-bishop`} kind='solid'/>
        }
        else if (piece.type === 'rook'){
            return <IconRook className={`piece-rook`} kind='solid'/>
        }
        else if (piece.type === 'queen'){
            return <IconQueen className={`piece-queen`} kind='solid'/>
        }
        else if (piece.type === 'king'){
            return <IconKing className={`piece-king`} kind='solid'/>
        }
        else {
            return null;
        }
    }, [status]);

    useEffect(()=>{

    });

    
    
    

    return (
        <div className={`${styles['root']} type----${typeSquare}`}>
            <div className={`${styles['piece']} side----${piece?.side.name}`}>
                {svgPiece}
            </div>
        </div>
    );
}

ChessSquare.defaultProps = {};

export default ChessSquare;

