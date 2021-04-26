import { call, select, put, delay } from "redux-saga/effects";
//import { firebaseFirestore } from "firebaseApp";

import {ChessInstance, Move, Square } from 'chess.js'
import chessFocusing from 'chessApp';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";
import * as types from "store/types";



function* backToStart(action: actions.data.quiz.type__BACK_TO_START) {

    const quizFocusing: types.data.quiz.Quiz =  yield select( (state:StateRoot) => state.data.quiz.focusing ); 
    const quizPresent: types.present.QuizPresent =  yield select( (state:StateRoot) => state.present.quiz ); 
    

    chessFocusing.load(quizFocusing.fenStart);

    const replacement = {
        ...quizPresent,
        fen: quizFocusing.fenStart,
        turn: chessFocusing.turn() === 'w' ? 'white' : 'black',
        seriesSan: [],
    }
    yield put(actions.present.return__REPLACE({
        listKey: ['quiz'],
        replacement: replacement,
    }));
    
}

export default backToStart;


