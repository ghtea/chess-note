import { call, spawn, put, takeEvery, select } from "redux-saga/effects";

import Cookies from 'js-cookie';

import * as actionsRoot from "store/actions";
import {StateRoot} from 'store/reducers';




function* readOptionTheme(action: actionsRoot.status.type__READ_OPTION_THEME) {
    
    const optionThemeCookie:string | undefined = Cookies.get('optionTheme');
    
    console.log(optionThemeCookie);
    
    if (typeof optionThemeCookie === 'string'){
        
        yield put( actionsRoot.status.return__REPLACE({
            listKey: ['current', 'theme', 'option'],
            replacement: optionThemeCookie
        }) );
        
        yield put( actionsRoot.status.return__DECIDE_THEME() );
    }
        
}

export default readOptionTheme;
