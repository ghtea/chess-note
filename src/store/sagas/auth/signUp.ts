import { call, spawn, put, takeEvery } from "redux-saga/effects";
import history from 'libraries/history';

import axios from "axios";
import queryString from 'query-string';

import firebaseApp, { firebaseAuth } from "libraries/firebase"; 

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';

import * as actions from "store/actions";

//import * as actionsTheme from "../../actions/theme";



const requestSignUp = (email:string, password:string) => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password)  
};


function* signUp(action: actions.auth.type__SIGN_UP) {
    try {

        yield put( actions.notification.return__REPLACE({
            listKey: ['listCodeSituationOthers'],
            replacement: []
        }) );
        
    

        if (action.payload.email === "") {
            console.log('type email address');
            yield put( actions.notification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_NoEmail__E'
            }) );
            //addDeleteNotification("auth01", language);
        }
        /*
        else if ( !(/\S+@\S+\.\S+/).test(action.payload.email) ){
            console.log('type valid email address');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_NotValidEmail'
            }) );
            //addDeleteNotification("auth021", language);
        }
        */
        else if (action.payload.password1 === "" || action.payload.password2 === "") {
            console.log('type both passwords');
            yield put( actions.notification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_NoPassword__E'
            }) );
            //addDeleteNotification("auth03", language);
        }
        else if (action.payload.password1 !== action.payload.password2) {
            console.log('two passwords are different');
            yield put( actions.notification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_PasswordsDifferent__E'
            }) );
            //addDeleteNotification("auth04", language);
        }
        /*
        else if (action.payload.password1.length < 6) {
            console.log('password is too short');
            yield put( actionsNotification.return__ADD_CODE_SITUATION_OTHERS({
                codeSituation: 'SignUp_ShortPassword'
            }) );
            //addDeleteNotification("auth04", language);
        }
        */
        else {

            yield put( actions.status.return__REPLACE({
                listKey: ['auth', 'user'],
                replacement: {
                    tried: false,
                    loading: true,
                    ready: false,
                }
            }) );
            
            const email:string = action.payload.email; 
            const password:string = action.payload.password1;
            
            try {
                // unknown 임시방편
                const user: unknown = yield call( requestSignUp, email, password );
                //console.log(user);

                yield put( actions.status.return__REPLACE({
                    listKey: ['auth', 'user'],
                    replacement: {
                        tried: true,
                        loading: false,
                        ready: false,
                    }
                }) );

                yield put( actions.auth.return__REPLACE_USER() );

                yield put( actions.notification.return__ADD_DELETE_BANNER({
                    codeSituation: 'SignUp_Succeeded__S'
                }) );

                
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
                if (error.code === 'auth/email-already-in-use'){
                    console.error(error.message);
                    yield put( actions.notification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'SignUp_DuplicateEmail__E'
                    }) );
                }
                else if (error.code === 'auth/invalid-email'){
                    console.error(error.message);
                    yield put( actions.notification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'SignUp_InvalidEmail__E'
                    }) );
                }
                else if (error.code === 'auth/weak-password'){
                    console.error(error.message);
                    yield put( actions.notification.return__ADD_CODE_SITUATION_OTHERS({
                        codeSituation: 'SignUp_WeakPassword__E'
                    }) );
                }
                else if (error.code === 'auth/operation-not-allowed'){
                    console.error(error.message);
                    yield put( actions.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'SignUp_UnknownError__E'
                    }) );
                }
                else {
                    console.error(error);
                    yield put( actions.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'SignUp_UnknownError__E'
                    }) );
                }
                
                
            }
            
              
            
        } // higher else
    

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
        console.error('signUp has been failed');
        
        yield put( actions.notification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'SignUp_UnknownError'
        }) );
    }
}

export default signUp;
