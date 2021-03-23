import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import {Chess, PieceType} from 'chess.js';

// https://github.com/STRML/react-draggable

//import IconPawn from 'svgs/chess/PiecePawn';

import srcImgWhitePawn from 'others/images/chess/pawn-w.png';
import srcImgBlackPawn from 'others/images/chess/pawn-b.png';
import srcImgWhiteKnight from 'others/images/chess/knight-w.png';
import srcImgBlackKnight from 'others/images/chess/knight-b.png';
import srcImgWhiteBishop from 'others/images/chess/bishop-w.png';
import srcImgBlackBishop from 'others/images/chess/bishop-b.png';
import srcImgWhiteRook from 'others/images/chess/rook-w.png';
import srcImgBlackRook from 'others/images/chess/rook-b.png';
import srcImgWhiteQueen from 'others/images/chess/queen-w.png';
import srcImgBlackQueen from 'others/images/chess/queen-b.png';
import srcImgWhiteKing from 'others/images/chess/king-w.png';
import srcImgBlackKing from 'others/images/chess/king-b.png';


import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './ChessSquare.module.scss';
// import IconSort from 'svgs/basic/IconSort';



type PropsChessSquare = {
    piece: {
        type: PieceType;
        color: "b" | "w";
    } | null;
    position: {
        rank: '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8';
        file: 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h';
    };
    color: 'light' | 'dark';
};


function ChessSquare({
    piece,
    position,
    color,
}: PropsChessSquare) {
    
    const dispatch = useDispatch();
    //const leagueStandings = useSelector((state: StateRoot)=>state.data.football.leagueStandings);

    //const sorting = useSelector((state: StateRoot)=>state.status.current.football.leagueStandings.sorting);

    // const {file, rank, piece, typeSquare} = useMemo(()=>{

    //     const result: Square = {...status, typeSquare: 'light'};
    //     if (['a', 'c', 'e', 'g'].includes(status.file)){
    //         result.typeSquare = status.rank % 2 === 0 ? 'light' : 'dark'
    //     }
    //     else {
    //         result.typeSquare = status.rank % 2 === 0 ? 'dark' : 'light'
    //     }
    //     return result; 
    // }, [status]);


    const srcImg = useMemo(()=>{
        if (!piece){
            return undefined;
        }
        else if (piece.type === 'p'){
            return piece.color === 'w' ? srcImgWhitePawn : srcImgBlackPawn
        }
        else if (piece.type === 'n'){
            return piece.color === 'w' ? srcImgWhiteKnight : srcImgBlackKnight
        }
        else if (piece.type === 'b'){
            return piece.color === 'w' ? srcImgWhiteBishop : srcImgBlackBishop
        }
        else if (piece.type === 'r'){
            return piece.color === 'w' ? srcImgWhiteRook : srcImgBlackRook
        }
        else if (piece.type === 'q'){
            return piece.color === 'w' ? srcImgWhiteQueen : srcImgBlackQueen
        }
        else if (piece.type === 'k'){
            return piece.color === 'w' ? srcImgWhiteKing : srcImgBlackKing
        }
        
    }, [piece]);

    useEffect(()=>{

    });

    
    
    

    return (
        <div className={`${styles['root']} color----${color}`}>
            {!piece ? null : 
                <img 
                    className={`${styles['piece']}`}
                    src={srcImg}
                >
                </img>
            }
        </div>
    );
}

ChessSquare.defaultProps = {};

export default ChessSquare;

 