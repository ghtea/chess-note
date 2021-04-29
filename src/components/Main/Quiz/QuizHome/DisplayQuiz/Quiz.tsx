import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actions  from 'store/actions';
import * as types  from 'store/types';

//import Portal from './Quiz/Portal';

import styles from './Quiz.module.scss';
import stylesDisplay from '../DisplayQuiz.module.scss';

 
// import IconSort from 'svgs/basic/IconSort';
type PropsQuiz = {
    quiz: types.data.quiz.Quiz;
}

function Quiz({
    quiz, 
}: PropsQuiz) {


    // const team = useSelector((state: StateRoot)=> state.data.football.listQuiz).find(team => team.id === idQuiz);
    // const mode = useSelector((state: StateRoot)=> state.status.current.football.leagueStandings.mode);

    // const reward = useMemo(()=>{
    //     if (statQuiz.result === 'Champions League'){
    //         return 'champions';
    //     }
    //     else if (statQuiz.result === 'Europa League'){
    //         return 'europa';
    //     }
    //     else if (statQuiz.result === 'Relegation'){
    //         return 'relegation';
    //     }
    //     else {
    //         return '';
    //     }
    // },[statQuiz]);

    // const dictStyleResult = useMemo(()=>{
    //     let dictStyle: any = {};
    //     for (const result of ['won', 'draw', 'lost'] ){
    //         dictStyle[result]= {
    //             width: `${statQuiz.overall[result as 'won'|'draw'|'lost'] / numberResultMax * 100}%`
    //         };
    //     }
    //     return dictStyle;
    // },[statQuiz, numberResultMax]);

    // const dictStyleGoals = useMemo(()=>{
    //     let dictStyle: any = {};
    //     for (const result of ['goals_scored', 'goals_against' ] ){
    //         dictStyle[result]= {
    //             width: `${statQuiz.overall[result as 'goals_scored'|'goals_against' ] / numberGoalsMax * 100}%`
    //         };
    //     }
    //     return dictStyle;
    // },[statQuiz, numberGoalsMax]);

    // const diffGoal = useMemo(()=>{
    //     if (statQuiz.overall.goals_diff > 0){
    //         return ({ text: `+${statQuiz.overall.goals_diff.toString()}`, className: 'plus-goals'});
    //     }
    //     else {
    //         return ({ text: `${statQuiz.overall.goals_diff.toString()}`, className: 'minus-goals'});
    //     }
    // },[statQuiz]);


    return (
        <tr className={`${styles['root']} ${stylesDisplay['row']}` }>

            <td className={`${styles['id']}`}> 
                {quiz.id}
            </td>
            

            <td className={`${styles['my-result']}`}>
                
            </td>


            <td className={`${styles['author']}`}>
                
            </td>
            

            <td className={`${styles['created']}`}>
                {quiz.dateCreated}
            </td>
            
        </tr>
    );
}

Quiz.defaultProps = {};

export default Quiz;






{/* <td className={`${styles['result']}`}>
    {mode.element === 'text' ?
    <span className={`${styles['text']}`}>
        <span className={`${styles['won']}`}>{statQuiz.overall.won}</span>  
        <span className={`${styles['draw']}`}>{statQuiz.overall.draw}</span> 
        <span className={`${styles['lost']}`}>{statQuiz.overall.lost}</span>
    </span>
    :
    <span className={`${styles['graph']}`}>
        <span className={`${styles['won']}`} style={dictStyleResult['won']} />
        <span className={`${styles['draw']}`} style={dictStyleResult['draw']}/>
        <span className={`${styles['lost']}`} style={dictStyleResult['lost']}/>
    </span>
    }
</td> */}



{/* <td className={`${styles['goals'] }`}>
    {mode.element === 'text' ?
    <span className={`${styles['text']}`}>
        <span className={`${styles[diffGoal.className] }`} > {diffGoal.text} </span>
        <span> { `( +${statQuiz.overall.goals_scored} / -${statQuiz.overall.goals_against} )` } </span>
    </span>
    :
    <span className={`${styles['graph']}`}>
        <span className={`${styles['scored']}`} style={dictStyleGoals['goals_scored']} />
        <span className={`${styles['against']}`} style={dictStyleGoals['goals_against']}/>
    </span>
    }
</td> */}