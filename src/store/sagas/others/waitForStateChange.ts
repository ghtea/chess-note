import { call, spawn, put, takeEvery, select, SelectEffect, take, race } from "redux-saga/effects";

import * as actions from "store/actions";

import {StateRoot} from 'store/reducers';

type Selector<T> = (state:StateRoot) => T;


// return 할 때까지 while 문에 갇힌다
export function* waitForStateChangeToCertainValue<T>( selector: Selector<T>, value?:T) {

    let valueCurrent: T = yield select(selector);
    if (valueCurrent === value) return; 

    while (true) {

        yield take([
            actions.appearance.name__REPLACE, 
            actions.auth.name__REPLACE, 
            actions.data.name__REPLACE, 
            actions.notification.name__REPLACE, 
            actions.status.name__REPLACE,
            actions.present.name__REPLACE,
        ]);
        
        valueCurrent = yield select(selector);
        
        if (valueCurrent === value)  {
            return valueCurrent;
        }

    }
}




export function* waitForStateChangeToDifferentValue<T>( selector: Selector<T>, value?:T) {

    let valuePrevious: T = yield select(selector);
    
    while (true) {

        yield take([
            actions.appearance.name__REPLACE, 
            actions.auth.name__REPLACE, 
            actions.data.name__REPLACE, 
            actions.notification.name__REPLACE, 
            actions.status.name__REPLACE,
            actions.present.name__REPLACE,
        ]);
        
        const valueCurrent: T = yield select(selector);

        if (valueCurrent !== valuePrevious) {
            return valueCurrent;
        }

    }
}


