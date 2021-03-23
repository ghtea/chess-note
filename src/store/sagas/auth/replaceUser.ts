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



function* replaceUser(action: actionsRoot.auth.type__REPLACE_USER) {
    try {

        const user = action.payload?.user || firebaseAuth.currentUser;

        if (user) {

            yield put( actionsRoot.auth.return__REPLACE({
                listKey: ['user'],
                replacement: {
                    id: user.uid,
                    email: user.email,
                    
                    photoURL: user.photoURL,
                    displayName: user.displayName,
        
                    joined: user.metadata.creationTime,
                    accessed: user.metadata.lastSignInTime
                }
            }) );
        }

        else {
            console.log('no user');
        }

    } catch (error) {
        console.error(error);
        console.error('replaceUser has been failed');
        
        yield put( actionsRoot.notification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'UnknownError__E'
        }) );
    }
}

export default replaceUser;
