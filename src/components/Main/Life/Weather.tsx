import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';


import * as actions  from 'store/actions';

import Loading from 'components/Global/Loading';
import WeatherOne from './Weather/Hourly';

import styles from './Weather.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsWeather = {};

function Weather({}: PropsWeather) {
  
    const dispatch = useDispatch();     
    
    const readyWeatherOne = useSelector((state: StateRoot) => state.status.ready.data.weather.weatherOne);
    const loadingWeatherOne= useSelector((state: StateRoot) => state.status.loading.data.weather.weatherOne);

    useEffect(()=>{
        dispatch(actions.data.weather.return__GET_WEATHER_ONE({})); 
    }, []);


    return (

        <div className={`${styles['root']}`} >
            {readyWeatherOne &&
                <WeatherOne />
            }

            {!readyWeatherOne && loadingWeatherOne &&
                <Loading />
            }
        </div>
    );
}

Weather.defaultProps = {}; 

export default Weather;


/*


            {readyLeagueStandings &&
                <LeagueStandings />
            }

            {!readyLeagueStandings && loadingLeagueStandings &&
                <Loading />
            }
*/
