import React, { useCallback, useEffect, useMemo } from "react";
import history from 'libraries/history';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actions  from 'store/actions';
import * as types  from 'store/types';

//import Portal from './Quiz/Portal';

import styles from './index.module.scss';
import stylesDisplay from '../index.module.scss';
import IconThreeDots from "svgs/basic/IconThreeDots";
import IconPlay from "svgs/basic/IconPlay";

 
// import IconSort from 'svgs/basic/IconSort';
type PropsQuiz = {
    quiz: types.data.quiz.Quiz;
}

function Quiz({
    quiz, 
}: PropsQuiz) {

    const dispatch = useDispatch();    

    // const situation = useSelector((state: StateRoot)=> state.present.quiz.focusing.situation);
    
    const onClick_Button = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        
            
        if (event.currentTarget.value === 'play-this-quiz'){
            console.log('play!');
            dispatch(actions.data.quiz.return__FOCUS_QUIZ({
                quiz: quiz,
                situation: 'playing',
            }));

            // 단 하나만 플레이 리스트로서 대체
            dispatch(actions.present.return__REPLACE({
                listKey: ['quiz', 'listIdPlaying'],
                replacement: [quiz.id],
            }));
        }
            
        
    }, [  ]);
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

    

    const textData = useMemo(()=>{
        const yearCurrent = new Date().getFullYear();
        
        if (quiz.dateCreated){
            const dateQC = new Date(quiz.dateCreated);

            const year = dateQC.getFullYear();
            const month = dateQC.getMonth()+1;
            const date = dateQC.getDate()+1;
            const hour = dateQC.getHours().toString().padStart(2, '0');
            const min = dateQC.getMinutes().toString().padStart(2, '0');

            if (yearCurrent === dateQC.getFullYear()){
                return `${month}/${date} ${hour}:${min}`;
            }
            else {
                return `${year}.${month}`;
            }
        }
        else {
            return ''
        }

    },[quiz.dateCreated]);


    return (
        <tr 
            className={`${styles['root']} 
            ${stylesDisplay['row']}` }  
        >

            <td className={`${styles['id']}`}> 
                {`${quiz.id?.toString().slice(0,16)}...`}
            </td>
            

            <td className={`${styles['my-result']}`}>
                
            </td>


            <td className={`${styles['author']}`}>
                {`${quiz.idUser.slice(0,6)}...`}
            </td>
            

            <td className={`${styles['created']}`}>
                {textData}
            </td>

            <td className={`${styles['play']}`}>
                <button
                    type='button'
                    onClick={onClick_Button}
                    value='play-this-quiz'
                    aria-label='Play This Quiz'
                >
                    <IconPlay className={styles['icon__play']} kind='solid' />
                </button>
            </td>

            <td className={`${styles['others']}`}>
                <IconThreeDots className={styles['icon__others']} kind='regular' />
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