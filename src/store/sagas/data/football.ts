import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";



import getLeagueStandings from 'store/sagas/data/football/getLeagueStandings';
import updateLeagueStandings from 'store/sagas/data/football/updateLeagueStandings';

import getListTeam from 'store/sagas/data/football/getListTeam';
import addTeam from 'store/sagas/data/football/addTeam';
import checkListTeam from 'store/sagas/data/football/checkListTeam';


import * as actions from "store/actions";


export default function* sagaData() {
    yield takeEvery( actions.data.football.name__GET_LEAGUE_STANDINGS, getLeagueStandings ); 
    yield takeEvery( actions.data.football.name__UPDATE_LEAGUE_STANDINGS, updateLeagueStandings ); 
    
    yield takeEvery( actions.data.football.name__GET_LIST_TEAM, getListTeam ); 
    yield takeEvery( actions.data.football.name__ADD_TEAM, addTeam ); 
    yield takeEvery( actions.data.football.name__CHECK_LIST_TEAM, checkListTeam ); 
}

