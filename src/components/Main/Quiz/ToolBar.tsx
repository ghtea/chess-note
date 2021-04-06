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

import styles from './ToolBar.module.scss';
import IconPaste from 'svgs/basic/IconSignIn';
import IconAngle from "svgs/basic/IconAngle";
import IconReverse from "svgs/basic/IconSyncAlt";
// import {Chess} from 'chess.js'; // => makes error

type PropsToolBar = {
    loadFen: (fen: string) => void,
};

function ToolBar({
    loadFen,
}: PropsToolBar) {

    const dispatch = useDispatch();

    const heightToolbar = useSelector((state: StateRoot)=>state.status.current.size.document.chessBoard.toolbar.height);
    const lengthChessBoard = useSelector((state: StateRoot)=>state.status.current.size.document.chessBoard.length);
    const side = useSelector((state: StateRoot)=>state.status.current.quiz.side);


    // const [positionStart, setPositionStart] = useState<null | string>(null);
    const onClick_ControlPaste = useCallback(
        async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            try { 
                const value = await clipboardy.read();
                //console.log(value)
                loadFen(value)
            }
            catch (e){

            }
    }, []);

    const onClick_Reverse = useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            dispatch(actions.status.return__REPLACE({ 
                listKey: ['current', 'quiz', 'instance', 'side'],
                replacement: side === 'white' ? 'black' : 'white'
            }));
    }, [side]);

    const onClick_Create = useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            dispatch(actions.status.return__REPLACE({ 
                listKey: ['showing', 'modal', 'quizPut'],
                replacement: true,
            }));
    }, []);

    const onClick_Save = useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            dispatch(actions.status.return__REPLACE({ 
                listKey: ['showing', 'modal', 'quizSave'],
                replacement: true,
            }));
    }, []);
    // const onClick_Board = useCallback(
    //     (event:React.MouseEvent<HTMLDivElement, MouseEvent>, positionStart: string | null) => {
    //     let elementUsing = event.target as HTMLDivElement | HTMLImageElement;
    //     //console.log(elementUsing.dataset)
    //     while (!elementUsing.dataset || elementUsing.dataset['level'] !== 'square'){
    //         elementUsing = elementUsing.parentElement as HTMLDivElement | HTMLImageElement;
    //     }
    //     const position = (elementUsing.dataset['file'] || '') + (elementUsing.dataset['rank'] || '')
    //     if (positionStart === null){
    //         //console.log(elementUsing.dataset['file'], )
            
    //         setPositionStart(position);
    //         console.log(position);
    //     }
    //     else {
    //         const result = gameCurrent.move({from: positionStart as Square, to: position as Square});
    //         //console.log('result', result);
    //         setPgn(gameCurrent.pgn());
    //         setPositionStart(null);
    //     }
    //     console.log(positionStart);
    //     // const {value} = event.currentTarget;

    //     // dispatch(actions.status.return__REPLACE({ 
    //     //     listKey: ['current', 'football', 'leagueStandings', 'mode', 'element'],
    //     //     replacement: value
    //     // }));
    
    //     },[gameCurrent]
    // );

    // useEffect(()=>{
    //     console.log('positionStart: ', positionStart);
    // },[positionStart])
    


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
                <button> {'<-'} </button>
            </div>

            <div
                className={`${styles['mode']}`}
            >
                <button
                    onClick={onClick_Create}
                > Create </button>
            </div>

            <div
                className={`${styles['control']}`}
            >
                <button>
                    <IconAngle className={`${styles['icon__backward']}`} kind='light' directon='left'/>
                </button>
                <button
                    type='button'
                    onClick={onClick_Reverse}
                >
                    {side === 'white' ? 'W' : 'B'}
                </button>
                <button
                    type='button'
                    onClick={onClick_ControlPaste}
                >
                    <IconPaste className={`${styles['icon__paste']}`} kind='light'/>
                </button>
                <button>
                    <IconAngle className={`${styles['icon__forward']}`} kind='light' directon='right'/>
                </button>
            </div>

            <div
                className={`${styles['save']}`}
            >
                <button
                    onClick={onClick_Save}
                > Save </button>
            </div>

            <div
                className={`${styles['others']}`}
            >
                <button> ... </button>
            </div>
            
        </div>
    );
}

ToolBar.defaultProps = {};

export default ToolBar;

