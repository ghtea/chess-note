import { call, spawn, put, takeEvery } from "redux-saga/effects";
import history from 'historyApp';

import { firebaseAuth } from "firebaseApp";

import Cookies from 'js-cookie';

// import * as config from 'config';

import * as actionsRoot from "store/actions";

//import * as actionsTheme from "../../actions/theme";


function* logOut(action: actionsRoot.auth.type__LOG_OUT) {

    firebaseAuth.signOut();

    yield put( actionsRoot.status.return__REPLACE({
        listKey: ['ready', 'user'],
        replacement: false
    }) );

    // history.push('/');

    window.location.reload(false);
    //window.location.href = window.location.href;

}

export default logOut;
