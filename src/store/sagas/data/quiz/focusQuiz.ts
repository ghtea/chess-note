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



    const { quiz, situation } = action.payload;
    
    const quizDefault: types.data.quiz.Quiz = {
        id: null,
        name: '',

        turnNext: 'white',
        fenStart: '',
        listSeriesSanCorrect: [],
        listSeriesSanMention: [],
        
        idUser: '',
        isPublic: true,
    }
    

    const quizData: types.data.quiz.Quiz = quiz || quizDefault;


    chessFocusing.load(quizData.fenStart);
    
    yield put( actions.data.return__REPLACE({
        listKey:['quiz', 'focusing'],
        replacement: quizData,
    }));

    yield put( actions.present.return__REPLACE({
        listKey:['quiz', 'focusing'],
        replacement: {
            idGame: quizData.id,
            situation: situation, 
            fen: quizData.fenStart,
            turn: quizData.turnNext,
            seriesSan: [],
        }
    }));


    let modeUrl = 'play';

    if (situation === 'playing'){
        modeUrl = 'play';
        history.push(`/quiz/${modeUrl}/${quizData.id}`);
    }
    else if (situation === 'creating'){
        modeUrl = 'create';
        history.push(`/quiz/${modeUrl}`);
    }
    else if (situation === 'editing'){
        modeUrl = 'edit';
        history.push(`/quiz/${modeUrl}/${quizData.id}`);
    }
            
        
    
}

export default focusQuiz;



