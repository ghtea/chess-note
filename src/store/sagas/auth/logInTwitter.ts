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




const requestLogInTwitter = (provider:any) => {
    return firebaseAuth.signInWithPopup(provider)
};


function* logInTwitter(action: actions.auth.type__LOG_IN_TWITTER) {
    try {

        const provider = new firebaseApp.auth.TwitterAuthProvider();
            //provider = new firebaseApp.auth.GithubAuthProvider();
        

        yield put( actions.notification.return__REPLACE({
            listKey: ['listCodeSituationOthers'],
            replacement: []
        }) );

        yield put( actions.status.return__REPLACE({
            listKey: ['auth', 'user'],
            replacement: {
                tried: false,
                loading: true,
                ready: false,
            }
        }) );
        
            
            try {
                const {user} = yield call( requestLogInTwitter, provider );
                //console.log(data.user);

                yield put( actions.status.return__REPLACE({
                    listKey: ['auth', 'user'],
                    replacement: {
                        tried: true,
                        loading: false,
                        ready: true,
                    }
                }) );
    
                yield put( actions.auth.return__REPLACE_USER() );
    

                history.push('/');
            } 
            catch (error){

                yield put( actions.status.return__REPLACE({
                    listKey: ['auth', 'user'],
                    replacement: {
                        tried: true,
                        loading: false,
                        ready: false,
                    }
                }) );
    
                yield put( actions.auth.return__REPLACE_USER() );
    
    

                console.error(error);
                if (error.code === 'auth/account-exists-with-different-credential'){
                    console.error(error.message);
                    yield put( actions.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogIn_UnknownError__E'
                    }) );
                }
                else {
                    console.error(error);
                    yield put( actions.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogIn_UnknownError__E'
                    }) );
                }
                
                
            }
                

    // go to home
        
        
    } catch (error) {
        
        yield put( actions.status.return__REPLACE({
            listKey: ['auth', 'user'],
            replacement: {
                tried: true,
                loading: false,
                ready: false,
            }
        }) );

        yield put( actions.auth.return__REPLACE_USER() );


        console.error(error);
        console.error('logInTwitter has been failed');
        
        yield put( actions.notification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'LogIn_UnknownError__E'
        }) );
    }
}

export default logInTwitter;
