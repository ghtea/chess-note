import { call, spawn, put, takeEvery, select, SelectEffect, take, race } from "redux-saga/effects";

import * as actions from "store/actions";

import {StateRoot} from 'store/reducers';

type Selector<T> = (state:StateRoot) => T;



function* waitForStateChange<T>( selector: Selector<T>, value:T) {

    let valueCurrent: T = yield select(selector);
    if (valueCurrent === value) return; 

    while (true) {

        yield take([actions.auth.name__REPLACE, actions.data.name__REPLACE, actions.notification.name__REPLACE, actions.status.name__REPLACE]);
        
        valueCurrent = yield select(selector);
        if (valueCurrent === value) return; 

    }
}

export default waitForStateChange;


/*

function* waitForStateChange<T>( section: 'auth' | 'data' | 'notification' | 'status', selector: Selector<T>, value:T) {

  if (yield select(selector) as unknown === value) return; 

  while (true) {

    if (section === 'auth'){
        yield take(actions.auth.name__REPLACE);
    }
    else if (section === 'data'){
        yield take(actions.data.name__REPLACE);
    }
    else if (section === 'notification'){
        yield take(actions.notification.name__REPLACE);
    }
    else {   // (section === 'status')
        yield take(actions.status.name__REPLACE);
    };
    
    if (yield select(selector) as unknown === value) return;

  }
}


*/