import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

// https://github.com/STRML/react-draggable

//import IconGraph from 'svgs/basic/IconChartBar';

import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './ToolBar.module.scss';
// import IconSort from 'svgs/basic/IconSort';
// import {Chess} from 'chess.js'; // => makes error

type PropsToolBar = {
    pgn: string;
    setPgn: React.Dispatch<React.SetStateAction<string>>
};

function ToolBar({
    pgn,
    setPgn
}: PropsToolBar) {

    const dispatch = useDispatch();
    const leagueStandings = useSelector((state: StateRoot)=>state.data.football.leagueStandings);

    const sorting = useSelector((state: StateRoot)=>state.status.current.football.leagueStandings.sorting);

    // const gameCurrent:ChessInstance = useMemo(()=>{
    //     return new ChessReq(); 
    // }, []);

    // const [positionStart, setPositionStart] = useState<null | string>(null);

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
    

    /*
    오프닝/문제 수정 => 저장, 뒤로돌리기

    오프닝


    직접 풀기 => 
    */

    return (
        <div 
            className={`${styles['root']}`} data-pgn={pgn}
        >
            <div>
                <button>answer</button>
            </div>

            <div>
                <button>edit / solve</button>
            </div>
            
        </div>
    );
}

ToolBar.defaultProps = {};

export default ToolBar;

