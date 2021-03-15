import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";
//import axios from "axios";
//import * as config from '../../config';

import * as actionsRoot from "store/actions";
import detectLanguage from './status/detectLanguage';

import readOptionTheme from './status/readOptionTheme';
import decideTheme from './status/decideTheme';



export default function* sagaStatus() {
    
    yield takeEvery( actionsRoot.status.name__DETECT_LANGUAGE, detectLanguage );

    yield takeEvery( actionsRoot.status.name__READ_OPTION_THEME, readOptionTheme );
    yield takeEvery( actionsRoot.status.name__DECIDE_THEME, decideTheme );
    
}