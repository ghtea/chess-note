import { call, spawn, put, takeEvery } from "redux-saga/effects";
import { firebaseAuth } from 'firebaseApp';

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

//import * as config from 'config';

import * as actions from "store/actions";

// action: actionsRoot.auth.type__LOG_CHECK_SUCCEEDED
function* logCheckSucceeded() {
    
    yield put( actions.status.return__REPLACE({
        listKey: ['auth', 'user'],
        replacement: {
            tried: true,
            loading: false,
            ready: true,
        }
    }) );
    
    yield put( actions.auth.return__REPLACE_USER() );

}

export default logCheckSucceeded;
