import { fork, all } from "redux-saga/effects";
//import axios from "axios";
//import * as config from '../../config';

import * as actions from "store/actions";

import sagaFootball from './data/football';
import sagaWeather from './data/weather';

export default function* sagaData() {
    yield all ([
        fork(sagaFootball),
        fork(sagaWeather),
    ])
}