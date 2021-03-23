import { call, spawn, put, takeEvery } from "redux-saga/effects";
import history from 'historyApp';

import axios from "axios";
import queryString from 'query-string';
import { firebaseAuth } from "firebaseApp";

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import * as actionsRoot from "store/actions";

//import * as actionsTheme from "../../actions/theme";



const requestLogIn = (email:string, password:string) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password)  
};


function* logIn(action: actionsRoot.auth.type__LOG_IN) {
    try {

        yield put( actionsRoot.notification.return__REPLACE({
            listKey: ['listCodeSituationOthers'],
            replacement: []
        }) );
        
        if (action.payload.email === "") {
            console.log('type email address');
            yield put( actionsRoot.notification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'LogIn_NoEmail__E'
            }) );
        }
        else if (action.payload.password === "") {
            console.log('type password');
            yield put( actionsRoot.notification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'LogIn_NoPassword__E'
            }) );
        }
        else {
            
            const email:string = action.payload.email; 
            const password:string = action.payload.password;
            
            try {
                const {user} = yield call( requestLogIn, email, password );
                //console.log(data.user);

                yield put( actionsRoot.status.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );

                yield put( actionsRoot.status.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: true
                }) );

                yield put( actionsRoot.auth.return__REPLACE_USER({
                    user: user
                }) );



                history.push('/');
            } 
            catch (error){

                yield put( actionsRoot.status.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: false
                }) );

                yield put( actionsRoot.status.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );

                yield put( actionsRoot.auth.return__REPLACE_USER({
                    user: null
                }) );


                console.error(error);
                if (error.code === 'auth/wrong-password'){
                    console.error(error.message);
                    yield put( actionsRoot.notification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'LogIn_WrongPassword__E'
                    }) );
                }
                else if (error.code === 'auth/invalid-email'){
                    console.error(error.message);
                    yield put( actionsRoot.notification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'LogIn_InvalidEmail__E'
                    }) );
                }
                else if (error.code === 'auth/user-disabled'){
                    console.error(error.message);
                    yield put( actionsRoot.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogIn_UserDisabled__E'
                    }) );
                }
                else if (error.code === 'auth/user-not-found'){
                    console.error(error.message);
                    yield put( actionsRoot.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogIn_UserNotFound__E'
                    }) );
                }
                else {
                    console.error(error);
                    yield put( actionsRoot.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogIn_UnknownError__E'
                    }) );
                }
                
                
            }
            
              
            
        } // higher else
    

    // go to home
        
        
    } catch (error) {
        
        yield put( actionsRoot.status.return__REPLACE({
            listKey: ['ready', 'user'],
            replacement: false
        }) );

        yield put( actionsRoot.status.return__REPLACE({
            listKey: ['loading', 'user'],
            replacement: false
        }) );

        console.error(error);
        console.log('logIn has been failed');
        
        yield put( actionsRoot.notification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'LogIn_UnknownError__E'
        }) );
    }
}

export default logIn;
