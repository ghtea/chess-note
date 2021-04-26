import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";


import * as actions from "store/actions";

import createQuiz from "./quiz/createQuiz";
import focusQuiz from "./quiz/focusQuiz";
import getListQuiz from "./quiz/getListQuiz";
import getQuizById from "./quiz/getQuizById";

import moveInQuizEditing from "./quiz/moveInQuizEditing";
import moveInQuizPlaying from "./quiz/moveInQuizPlaying";

import backToStart from "./quiz/backToStart";


import watchFenStart from "./quiz/watchFenStart";


export default function* sagaQuiz() {
    
    yield takeEvery( actions.data.quiz.name__FOCUS_QUIZ,  focusQuiz); 

    yield takeEvery( actions.data.quiz.name__CREATE_QUIZ,  createQuiz); 
    yield takeEvery( actions.data.quiz.name__GET_LIST_QUIZ,  getListQuiz);  
    yield takeEvery( actions.data.quiz.name__GET_QUIZ_BY_ID ,  getQuizById);  

    
    yield takeEvery( actions.data.quiz.name__MOVE_IN_QUIZ_EDITING ,  moveInQuizEditing);  
    yield takeEvery( actions.data.quiz.name__MOVE_IN_QUIZ_PLAYING,  moveInQuizPlaying);  


    yield takeEvery( actions.data.quiz.name__BACK_TO_START ,  backToStart);  

    yield takeEvery( actions.data.quiz.name__WATCH_FEN_START_CHANGE ,  watchFenStart);  

    // yield takeEvery( actions.data.football.name__UPDATE_LEAGUE_STANDINGS, updateLeagueStandings ); 
    
    // yield takeEvery( actions.data.football.name__GET_LIST_TEAM, getListTeam ); 
    // yield takeEvery( actions.data.football.name__ADD_TEAM, addTeam ); 
    // yield takeEvery( actions.data.football.name__CHECK_LIST_TEAM, checkListTeam ); 
}

