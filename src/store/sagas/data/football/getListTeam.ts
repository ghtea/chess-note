import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";
import firebase from "firebase";

import axios from "axios";
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";


const requestGetListTeam = (idCountry?:string) => {
    if (idCountry){
        return firebaseFirestore.collection("Football.Team_")
        .where("idCountry", "==", idCountry)
        .get()
    }
    else {
        return firebaseFirestore.collection("Football.Team_")
        .get()
    }
};

/*
return firebaseFirestore.collection("LeagueStandings_")
    .where("idLeague", "==", idLeague)
    .get()
*/

// get first from my database
// if data (update date) is old, dispatch updateLeagueStandings
// idUser is not needed
function* getListTeam(action: actions.data.football.type__GET_LIST_TEAM) {

    const {idCountry} = action.payload;

    try {
            
        yield put( actions.status.return__REPLACE({
            listKey: ['ready', 'data', 'football', 'listTeam'],
            replacement: false
        }) );
        yield put( actions.status.return__REPLACE({
            listKey: ['loading', 'data', 'football', 'listTeam'],
            replacement: true
        }) );

        const querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>  =  yield call( requestGetListTeam, idCountry );
        // console.log(res.data());
        const listTeam = querySnapshot.docs.map((document: any)=>(
            {
                ...document.data(),
                id: document.id
            }
        ));

        yield put( actions.data.return__REPLACE({
            listKey: ['football', 'listTeam'],
            replacement: listTeam
        }) );

        yield put( actions.status.return__REPLACE({
            listKey: ['loading', 'data', 'football', 'listTeam'],
            replacement: false
        }) );
        
        yield put( actions.status.return__REPLACE({
            listKey: ['ready', 'data', 'football', 'listTeam'],
            replacement: true
        }) );
        

        // trigger sorting of standings

    } catch (error) {
        
        console.error(error)

        yield put( actions.status.return__REPLACE({
            listKey: ['loading', 'data', 'football', 'listTeam'],
            replacement: false
        }) );
        
        yield put( actions.status.return__REPLACE({
            listKey: ['ready', 'data', 'football', 'listTeam'],
            replacement: false
        }) );
        
        yield put( actions.notification.return__ADD_DELETE_BANNER({
            codeSituation: 'Football_GetListTeam_UnknownError__E'
        }) );
    }
}

export default getListTeam;