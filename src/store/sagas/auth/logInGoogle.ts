import { call, spawn, put, takeEvery } from "redux-saga/effects";
import history from 'historyApp';

import axios from "axios";
import queryString from 'query-string';
import firebaseApp, { firebaseAuth } from "firebaseApp";

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';

import * as actions from "store/actions";

//import * as actionsTheme from "../../actions/theme";




const requestLogInGoogle = (provider:any) => {
    return firebaseAuth.signInWithPopup(provider)
};


function* logInGoogle(action: actions.auth.type__LOG_IN_GOOGLE) {
    try {

        const provider = new firebaseApp.auth.GoogleAuthProvider();
            //provider = new firebaseApp.auth.GithubAuthProvider();
        

        yield put( actions.notification.return__REPLACE({
            listKey: ['listCodeSituationOthers'],
            replacement: []
        }) );
        
            
            try {
                const {user} = yield call( requestLogInGoogle, provider );
                //console.log(data.user);

                yield put( actions.status.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );

                yield put( actions.status.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: true
                }) );

                yield put( actions.auth.return__REPLACE_USER({
                    user: user
                }) );

                history.push('/');
            } 
            catch (error){

                yield put( actions.status.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: false
                }) );

                yield put( actions.status.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );

                yield put( actions.auth.return__REPLACE({
                    listKey: ['user'],
                    replacement: null
                }) );


                console.error(error);
                if (error.code === 'auth/account-exists-with-different-credential'){
                    console.error(error.message);
                    yield put( actions.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogInGoogle_UnknownError__E'
                    }) );
                }
                else {
                    console.error(error);
                    yield put( actions.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogInGoogle_UnknownError__E'
                    }) );
                }
                
                
            }
                

    // go to home
        
        
    } catch (error) {
        
        yield put( actions.status.return__REPLACE({
            listKey: ['ready', 'user'],
            replacement: false
        }) );

        yield put( actions.status.return__REPLACE({
            listKey: ['loading', 'user'],
            replacement: false
        }) );

        yield put( actions.auth.return__REPLACE_USER({
            user: null
        }) );
        
        console.error(error);
        console.error('logInGoogle has been failed');
        
        yield put( actions.notification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'LogInGoogle_UnknownError__E'
        }) );
    }
}

export default logInGoogle;
