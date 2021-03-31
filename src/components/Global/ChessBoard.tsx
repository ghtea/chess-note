import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

// https://github.com/STRML/react-draggable

//import IconGraph from 'svgs/basic/IconChartBar';

import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './ChessBoard.module.scss';
import ChessSquare from "./ChessBoard/ChessSquare";
// import IconSort from 'svgs/basic/IconSort';
// import {Chess} from 'chess.js'; // => makes error
import { ChessInstance, PieceType, Square } from 'chess.js'

const ChessReq:any = require('chess.js');
// https://stackoverflow.com/questions/58598457/not-a-constructor-error-with-library-and-angular
// const Chess:ChessInstance = new ChessReq();

type PropsChessBoard = {
    //fen: string;
    listSquare: ({
        type: PieceType;
        color: "b" | "w";
    } | null)[][];
    move: (from: string, to: string) => void
};

function ChessBoard({
    //fen,
    move,
    listSquare,
}: PropsChessBoard) {

    const dispatch = useDispatch();
    const {innerWidth, innerHeight} = useSelector((state: StateRoot)=>state.status.current.size.window);
    const heightHeader = useSelector((state: StateRoot)=>state.status.current.size.document.header.height);
    const heightToolBar = useSelector((state: StateRoot)=>state.status.current.size.document.chessBoard.toolbar.height);
    const lengthChessBoard = useSelector((state: StateRoot)=>state.status.current.size.document.chessBoard.length);

    useEffect(()=>{
        // height
        let lengthChessBoardNew = 0;
        const innerLengthShorter = innerWidth <= innerHeight ? innerWidth : innerHeight;
        
        if (innerLengthShorter <= 576){
            if (innerHeight <= innerWidth + heightHeader + heightToolBar){
                lengthChessBoardNew = (innerHeight - heightHeader - heightToolBar);
            }
            else {
                lengthChessBoardNew = (innerLengthShorter);
            }
        }
        else {
            // 576 넘어갈때 갑자기 바뀌는 거 방지하면서 조정
            const lengthMax = 700;
            const lengthWhenHeightIsShort = innerHeight - heightHeader - 20 - heightToolBar; // 20 은 header아래 margin
            lengthChessBoardNew = ( Math.min(lengthWhenHeightIsShort, lengthMax, innerLengthShorter) );
        }
        dispatch( actions.status.return__REPLACE({
            listKey: ['current', 'size', 'document', 'chessBoard', 'length'],
            replacement: lengthChessBoardNew
        }) );
        // $device-xs__min-width: 320px;     
        // $device-s__min-width: 576px;      
        // $device-m__min-width: 768px;
        // $device-l__min-width: 992px;
    }, [innerWidth, innerHeight, heightHeader, heightToolBar  ]);


    

    const [positionStart, setPositionStart] = useState<null | string>(null);

    const onClick_Board = useCallback(
        (event:React.MouseEvent<HTMLDivElement, MouseEvent>, positionStart: string | null) => {
        let elementUsing = event.target as HTMLDivElement | HTMLImageElement;
        //console.log(elementUsing.dataset)
        while (!elementUsing.dataset || elementUsing.dataset['level'] !== 'square'){
            elementUsing = elementUsing.parentElement as HTMLDivElement | HTMLImageElement;
        }
        const position = (elementUsing.dataset['file'] || '') + (elementUsing.dataset['rank'] || '')
        if (positionStart === null){
            //console.log(elementUsing.dataset['file'], )
            
            setPositionStart(position);
            console.log(position);
        }
        else {
            move(positionStart, position);
            //const result = gameCurrent.move({from: positionStart as Square, to: position as Square});
            //console.log('result', result);
            //setPgn(gameCurrent.pgn());
            setPositionStart(null);
        }
        console.log(positionStart);
    
        },[]
    );

    

    return (
        <div 
            className={`${styles['root']}`}
            onClick={e=>onClick_Board(e, positionStart)}
            style={{width: lengthChessBoard, height: lengthChessBoard}}
        >
            {listSquare.map((row,iRow)=>row.map((e, iCol)=>
                {
                    const rank = (8-iRow).toString() as "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
                    const file = 'abcdefgh'[iCol] as "a" | "b" | "g" | "c" | "d" | "e" | "f" | "h";
                    const color = (iRow + iCol) % 2 === 1 ? 'light' : 'dark';
                    return (
                        <ChessSquare 
                            piece={e}
                            position={{rank, file}}
                            focused={file+rank===positionStart}
                            color={color}
                            key={`ChessSquare-${iRow}-${iCol}`}
                        />
                    )
                }
            ))}
        </div>
    );
}

ChessBoard.defaultProps = {};

export default ChessBoard;

