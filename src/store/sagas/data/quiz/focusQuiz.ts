import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

import axios from "axios";
import apolloClient from 'apollo';
import { gql, useQuery , FetchResult, DocumentNode, ApolloQueryResult} from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import history from 'historyApp';
// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";
import * as types from "store/types";
import { queryAllByAltText } from "@testing-library/dom";
// import { KindGetListQuiz } from "store/types/data/quiz";
import chessFocusing from 'chessApp';

// GraphQL query 문법에 이상 있으면 할당하는 시점에서 에러 발생시키기 때문에 에러 처리한 곳에서 해야 한다


// idUser 있으면 개인 퀴즈들, 없으면 공개 퀴즈들
function* focusQuiz( action: actions.data.quiz.type__FOCUS_QUIZ ) {



    const { quiz, mode } = action.payload;
    
    const quizDefault: types.data.quiz.Quiz = {
        id: null,
        name: '',

        turnNext: 'white',
        fenStart: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        listSeriesSanCorrect: [],
        
        idUser: '',
        isPublic: true,
    }
    

    const quizFocusing: types.data.quiz.Quiz = quiz || quizDefault;


    chessFocusing.load(quizFocusing.fenStart);
    
    yield put( actions.data.return__REPLACE({
        listKey:['quiz', 'focusing'],
        replacement: quizFocusing,
    }));

    yield put( actions.present.return__REPLACE({
        listKey:['quiz'],
        replacement: {
            idGame: quizFocusing.id,
            mode: mode, 
            fen: quizFocusing.fenStart,
            turn: quizFocusing.turnNext,
            seriesSan: [],
        }
    }));


    let modeUrl = 'play';

    if (mode === 'playing'){
        modeUrl = 'play';
        history.push(`/quiz/${modeUrl}/${quizFocusing.id}`);
    }
    else if (mode === 'creating'){
        modeUrl = 'create';
        history.push(`/quiz/${modeUrl}`);
    }
    else if (mode === 'editing'){
        modeUrl = 'edit';
        history.push(`/quiz/${modeUrl}/${quizFocusing.id}`);
    }
            
        
    
}

export default focusQuiz;



