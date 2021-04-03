import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";


import * as actions from "store/actions";
import createQuiz from "./quiz/createQuiz";

export default function* sagaQuiz() {
    yield takeEvery( actions.data.quiz.name__CREATE_QUIZ,  createQuiz); 
    // yield takeEvery( actions.data.football.name__UPDATE_LEAGUE_STANDINGS, updateLeagueStandings ); 
    
    // yield takeEvery( actions.data.football.name__GET_LIST_TEAM, getListTeam ); 
    // yield takeEvery( actions.data.football.name__ADD_TEAM, addTeam ); 
    // yield takeEvery( actions.data.football.name__CHECK_LIST_TEAM, checkListTeam ); 
}

