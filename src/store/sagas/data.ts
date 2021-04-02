import { fork, all } from "redux-saga/effects";
//import axios from "axios";
//import * as config from '../../config';

import * as actions from "store/actions";

import sagaQuiz from './data/quiz';

export default function* sagaData() {
    yield all ([
        fork(sagaQuiz),
    ])
}