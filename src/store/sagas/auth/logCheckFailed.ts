import { call, spawn, put, takeEvery } from "redux-saga/effects";
import { firebaseAuth } from 'firebaseApp';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

//import * as config from 'config';
import * as actionsRoot from "store/actions";


type Action = actionsRoot.auth.type__LOG_CHECK_FAILED;

function* logCheckFailed(action: actionsRoot.auth.type__LOG_CHECK_FAILED) {
    
    

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
    
    yield put( actionsRoot.notification.return__ADD_CODE_SITUATION_OTHERS({
        codeSituation: 'LogCheck_UnknownError__E'
    }) );
    console.log('log check failed');
}

export default logCheckFailed;
