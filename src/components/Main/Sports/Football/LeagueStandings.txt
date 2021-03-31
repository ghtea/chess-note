import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';


// https://github.com/STRML/react-draggable
import returnListStatTeamSorted from './LeagueStandings/returnListStatTeamSorted';
import Team from './LeagueStandings/Team';

import IconGraph from 'svgs/basic/IconChartBar';
import IconText from 'svgs/basic/IconText';
import IconSort from 'svgs/basic/IconSort';


import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './LeagueStandings.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsLeagueStandings = {
};

function LeagueStandings({}: PropsLeagueStandings) {

    const dispatch = useDispatch();
    const leagueStandings = useSelector((state: StateRoot)=>state.data.football.leagueStandings);

    const sorting = useSelector((state: StateRoot)=>state.status.current.football.leagueStandings.sorting);
    const mode = useSelector((state: StateRoot)=>state.status.current.football.leagueStandings.mode);

    const onClick_ShowModal = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {value} = event.currentTarget;
        dispatch(actions.status.return__REPLACE({ 
            listKey: ['showing', 'modal', value],
            replacement: true
        }));
        },[]
    );
    

    const onClick_ChangeMode = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {value} = event.currentTarget;

        dispatch(actions.status.return__REPLACE({ 
            listKey: ['current', 'football', 'leagueStandings', 'mode', 'element'],
            replacement: value
        }));
    
        },[]
    );

    
    const listStatTeamSorted = useMemo(()=>{
        return leagueStandings ? returnListStatTeamSorted(leagueStandings, sorting) : []; 
    }, [leagueStandings, sorting]);
    

    const numberResultMax = useMemo(()=>{
        const listNumberWon = listStatTeamSorted.map((statTeamEach:types.data.football.StatTeam)=>statTeamEach.overall.won);
        const listNumberDraw = listStatTeamSorted.map((statTeamEach:types.data.football.StatTeam)=>statTeamEach.overall.draw);
        const listNumberLost = listStatTeamSorted.map((statTeamEach:types.data.football.StatTeam)=>statTeamEach.overall.lost);
        return Math.max(...listNumberWon, ...listNumberDraw, ...listNumberLost)
    }, []);

    const numberGoalsMax = useMemo(()=>{
        const listNumberGoalsScored = listStatTeamSorted.map((statTeamEach:types.data.football.StatTeam)=>statTeamEach.overall.goals_scored);
        const listNumberGoalsAgainst = listStatTeamSorted.map((statTeamEach:types.data.football.StatTeam)=>statTeamEach.overall.goals_against);
        return Math.max(...listNumberGoalsScored, ...listNumberGoalsAgainst )
    }, []);

    return (
        <div className={`${styles['root']}`}>

            <h2> League Standings </h2>

            <div className={`${styles['options']}`}>
                <button
                    className={`${styles['sorting']}`}
                    type='button'
                    value='sortingFootballLeagueStandings'
                    onClick={onClick_ShowModal}
                >
                    <IconSort className={`${styles['icon__sort']}`} />
                </button>

                <button
                    className={`${styles['mode-element']}`}
                    type='button'
                    value={mode.element === 'text' ? 'graph' : 'text'}
                    onClick={onClick_ChangeMode}
                >
                    {mode.element === 'text' ? 
                    <IconText className={`${styles['icon__text']}`} /> 
                    : 
                    <IconGraph className={`${styles['icon__graph']}`} /> 
                    }
                </button>
                
            </div>

            <table className={`mode----${mode}`} aria-label='League Standings'>

                <thead>
                    <tr className={`${styles['row']}`} >
                        <th scope="col">
                            <span></span>
                            <span></span>
                        </th>
                        <th scope="col">
                            <span></span>
                            <span>Team</span>
                        </th>
                        <th scope="col">
                            <span>Pts</span>
                            <span>Points</span>
                        </th>
                        <th scope="col">
                            <span>G</span>
                            <span>Games</span>
                        </th>
                        <th scope="col">
                            <span>Results</span>
                            <span>Results</span>
                        </th>
                        <th scope="col">
                            <span>Goal Diff</span>
                            <span>Goal Difference</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listStatTeamSorted.map( (statTeamEach:types.data.football.StatTeam, index: number) => (
                        <Team 
                            statTeam={statTeamEach}
                            index={index}
                            numberResultMax={numberResultMax}
                            numberGoalsMax={numberGoalsMax}

                            key={`Team-${index}`}
                        />
                    ))} 
                </tbody>

            </table>

        </div>
    );
}

LeagueStandings.defaultProps = {};

export default LeagueStandings;

