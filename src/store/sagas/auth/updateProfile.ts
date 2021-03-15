import { call, select, put, getContext } from "redux-saga/effects";
import { firebaseAuth, firebaseStorage } from "firebaseApp";

import { v4 as uuidv4 } from "uuid";

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";
import {User} from 'store/reducers/auth'
import * as actionsPortal from "store/actions/data";
//import * as actionsTheme from "../../actions/theme";

const uploadPhoto = (refFirebase: any, urlPhotoLocal: string) => {
    return refFirebase.putString(urlPhotoLocal, "data_url")
}
const getUrlPhotoFirebase = (response: any) => {
    return response.ref.getDownloadURL()
}
const updateProfileFirebase = (update: any) => {
    return firebaseAuth?.currentUser?.updateProfile(update)
}


function* updateProfile(action: actionsRoot.auth.type__UPDATE_PROFILE) {

    const readyUser: boolean  =  yield select( (state:StateRoot) => state.status.ready.user); 
    const idUserInApp: undefined | string =  yield select( (state:StateRoot) => state.auth.user?.id); 
   
    try {

        if (!readyUser){
            yield put(actionsRoot.notification.return__ADD_DELETE_BANNER({
                codeSituation: 'NotLoggedIn__E'
            }) );
        }
        /*
        else if (action.payload.initials.length > 3) {
            yield put( actionsNotification.return__ADD_DELETE_BANNER({
                codeSituation: 'Portal_InitialsTooLong__E'
            }) );
        }
        */
        else {
            // let userFirebase = firebaseAuth.currentUser;
            const {payload: {displayName, urlPhotoLocal}} = action;
                        
            let update: any = {};

            if (displayName){
                update['displayName'] = displayName;
            }

            if (urlPhotoLocal){
                const refFirebase = firebaseStorage
                .ref()
                .child(`${idUserInApp}/${uuidv4()}`);

                const response: unknown = yield call( uploadPhoto, refFirebase, urlPhotoLocal); // upload photo
                const urlPhotoFirebase:string = yield call (getUrlPhotoFirebase, response);

                update['photoURL'] = urlPhotoFirebase;
            }

            yield call (updateProfileFirebase, update);
            yield put (actionsRoot.auth.return__REPLACE_USER());

            console.log('updateProfile worked successfully!');
            
        }

    } catch (error) {
        
        console.error(error);
        console.error('updateProfile has been failed');
        
        yield put( actionsRoot.notification.return__ADD_DELETE_BANNER({
            codeSituation: 'UnknownError__E'
        }) );
    }
}

export default updateProfile;
