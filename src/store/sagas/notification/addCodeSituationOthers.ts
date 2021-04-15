import { delay, put, takeEvery, select } from "redux-saga/effects";

import * as actions from "store/actions";
import {StateRoot} from 'store/reducers';


function* addCodeSituationOthers(action: actions.notification.type__ADD_CODE_SITUATION_OTHERS) {
    
    const listCodeSituationOthersPrevious: string[] =  yield select( (state:StateRoot) => state.notification.listCodeSituationOthers ); 
      
    
    const listCodeSituationOthersNew = [action.payload.codeSituation, ...listCodeSituationOthersPrevious];
        
        
    yield put( actions.notification.return__REPLACE({
        listKey: ['listCodeSituationOthers'],
        replacement: listCodeSituationOthersNew
    }) );
    
}

export default addCodeSituationOthers;
