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
import { ChessInstance, Square } from 'chess.js'

const ChessReq:any = require('chess.js');
// https://stackoverflow.com/questions/58598457/not-a-constructor-error-with-library-and-angular
// const Chess:ChessInstance = new ChessReq();

type PropsChessBoard = {
    pgn: string;
    setPgn: React.Dispatch<React.SetStateAction<string>>
};

function ChessBoard({
    pgn,
    setPgn
}: PropsChessBoard) {

    const dispatch = useDispatch();
    const leagueStandings = useSelector((state: StateRoot)=>state.data.football.leagueStandings);

    const sorting = useSelector((state: StateRoot)=>state.status.current.football.leagueStandings.sorting);

    const gameCurrent:ChessInstance = useMemo(()=>{
        return new ChessReq(); 
    }, []);

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
            const result = gameCurrent.move({from: positionStart as Square, to: position as Square});
            //console.log('result', result);
            setPgn(gameCurrent.pgn());
            setPositionStart(null);
        }
        console.log(positionStart);
        // const {value} = event.currentTarget;

        // dispatch(actions.status.return__REPLACE({ 
        //     listKey: ['current', 'football', 'leagueStandings', 'mode', 'element'],
        //     replacement: value
        // }));
    
        },[gameCurrent]
    );

    useEffect(()=>{
        console.log('positionStart: ', positionStart);
    },[positionStart])
    

    const [listSquare, setListSquare] = useState(gameCurrent.board())
    useEffect(()=>{
        if (gameCurrent){
            //console.log(pgn)
            gameCurrent.load_pgn(pgn);
            setListSquare(gameCurrent.board())
            //console.log(gameCurrent.history())
        }
    }, [pgn, gameCurrent]);

    
    
    

    return (
        <div 
            className={`${styles['root']}`} data-pgn={pgn}
            onClick={e=>onClick_Board(e, positionStart)}
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
                            key={`ChessSquare-${iRow}-${iCol}-${pgn}`}
                        />
                    )
                }
            ))}
        </div>
    );
}

ChessBoard.defaultProps = {};

export default ChessBoard;

