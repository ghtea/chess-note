import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

import axios, {AxiosResponse} from "axios";
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";
import * as types from "store/types";



const requestGetWeatherOne = (lat:number = 37.2636, lon:number = 127.0286): Promise<AxiosResponse<types.data.weather.WeatherOne>> => { 
    return axios.get(`${process.env.REACT_APP_OPEN_WEATHER_URL_FRONT}/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`)
};

/*

https://openweathermap.org/api/one-call-api

`${process.env.REACT_APP_OPEN_WEATHER_URL_FRONT}/onecall?lat=${lat}&lon={lon}&appid=${process.env.REACT_APP_SPORT_DATA_API_API_KEY}`


https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=750bac5e554109ad1e24ce1c5e55351d

*/



function* getWeatherOne(action: actions.data.weather.type__GET_WEATHER_ONE) {

    console.log('hello')
    try {
            
        yield put( actions.status.return__REPLACE({
            listKey: ['ready', 'data', 'weather', 'weatherOne'],
            replacement: false
        }) );
        yield put( actions.status.return__REPLACE({
            listKey: ['loading', 'data', 'weather', 'weatherOne'],
            replacement: true
        }) );

        const res =  yield call( requestGetWeatherOne );
        //console.log(res);

        let weatherOne: types.data.weather.WeatherOne = res.data;
        //console.log(weatherOne);
        
        for (let i=0; i<weatherOne.hourly.length; i++){
            weatherOne.hourly[i].hour = new Date(weatherOne.hourly[i].dt * 1000).getHours();
            weatherOne.hourly[i].date = new Date(weatherOne.hourly[i].dt * 1000).getDate();
            weatherOne.hourly[i].index = i;
        }

        yield put( actions.data.return__REPLACE({
            listKey: ['weather', 'weatherOne'],
            replacement: weatherOne
        }) );

        yield put( actions.status.return__REPLACE({
            listKey: ['loading', 'data', 'weather', 'weatherOne'],
            replacement: false
        }) );
        
        yield put( actions.status.return__REPLACE({
            listKey: ['ready', 'data', 'weather', 'weatherOne'],
            replacement: true
        }) );
        
    } catch (error) {
        
        console.error(error);

        yield put( actions.status.return__REPLACE({
            listKey: ['loading', 'data', 'weather', 'weatherOne'],
            replacement: false
        }) );
        
        yield put( actions.status.return__REPLACE({
            listKey: ['ready', 'data', 'weather', 'weatherOne'],
            replacement: false
        }) );
        
        yield put( actions.notification.return__ADD_DELETE_BANNER({
            codeSituation: 'Weather_GetWeather_UnknownError__E'
        }) );
    }
}

export default getWeatherOne;