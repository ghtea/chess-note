import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';


import * as actions  from 'store/actions';

import Loading from 'components/Global/Loading';
import LeagueStandings from './Football/LeagueStandings';

import styles from './Football.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsFootball = {};

function Football({}: PropsFootball) {
  
    const dispatch = useDispatch();     
    
    const readyLeagueStandings = useSelector((state: StateRoot) => state.status.ready.data.football.leagueStandings);
    const loadingLeagueStandings = useSelector((state: StateRoot) => state.status.loading.data.football.leagueStandings);

    useEffect(()=>{
        dispatch(actions.data.football.return__GET_LEAGUE_STANDINGS({
            idLeague: '237'
        }));
    }, []);

    useEffect(()=>{
        dispatch(actions.data.football.return__GET_LIST_TEAM({
        }));
    }, []); 

    return (

        <div className={`${styles['root']}`} >
            
            {readyLeagueStandings &&
                <LeagueStandings />
            }

            {!readyLeagueStandings && loadingLeagueStandings &&
                <Loading />
            }

        </div>
    );
}

Football.defaultProps = {};

export default Football;

