import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "libraries/firebase";

import history from 'libraries/history';

import axios from "axios";
import apolloClient from 'apollo';
import { gql, useQuery , FetchResult, ApolloQueryResult} from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";
import * as types from "store/types";

const CREATE_QUIZ = gql`
    mutation CreateQuiz($argument: CreateQuizInputType!){
        createQuiz(createQuizInputType: $argument) 
            ${types.data.quiz.stringGqlQuiz}
    }
`;




const requestCreateQuiz = (argument: any) => { 
    return apolloClient.mutate({mutation: CREATE_QUIZ, variables: {argument}});
};



// directly access to sportdataAPI -> update firebase (get document on return)
function* createQuiz(action: actions.data.quiz.type__CREATE_QUIZ) {

    const {name, turnNext, fenStart, listSeriesSanCorrect, listSeriesSanMention, idUser, isPublic} = action.payload;

    if (!fenStart){
        yield put( actions.notification.return__ADD_DELETE_BANNER({
            codeSituation: 'CreateQuiz_NoFenStart__E'
        }) );
    }
    else if (listSeriesSanCorrect.length === 0){
        yield put( actions.notification.return__ADD_DELETE_BANNER({
            codeSituation: 'CreateQuiz_NoAnswer__E'
        }) );
    }

    else {

    
        try {

            const argument = {
                name,
                turnNext,
                fenStart,
                listSeriesSanCorrect,
                listSeriesSanMention,
                idUser,
                isPublic,
            };

            //const data: unknown =  yield call( requestCreateQuiz, argument ); 
            const res: ApolloQueryResult<any> =  yield call( requestCreateQuiz,  argument); 
            
            yield put( actions.notification.return__ADD_DELETE_BANNER({
                codeSituation: 'CreateQuiz_Succeeded__S'
            }) );

            console.log(res)
            
            const quizFromRes = res.data?.createQuiz as types.data.quiz.Quiz | undefined;
            if (quizFromRes?.id){
                history.push(`/quiz/edit/${quizFromRes.id}`);
            }

        } catch (error) {
            
            console.error(error);
            
            yield put( actions.notification.return__ADD_DELETE_BANNER({
                codeSituation: 'CreateQuiz_UnknownError__E'
            }) );
        }
    } // else 
}

export default createQuiz;




