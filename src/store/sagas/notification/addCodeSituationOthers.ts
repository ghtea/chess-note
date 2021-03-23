import { delay, put, takeEvery, select } from "redux-saga/effects";

import * as actionsRoot from "store/actions";
import {StateRoot} from 'store/reducers';


function* addCodeSituationOthers(action: actionsRoot.notification.type__ADD_CODE_SITUATION_OTHERS) {
    
    const listCodeSituationOthersPrevious: string[] =  yield select( (state:StateRoot) => state.notification.listCodeSituationOthers ); 
      
    
    const listCodeSituationOthersNew = [action.payload.codeSituation, ...listCodeSituationOthersPrevious];
        
        
    yield put( actionsRoot.notification.return__REPLACE({
        listKey: ['listCodeSituationOthers'],
        replacement: listCodeSituationOthersNew
    }) );
    
}

export default addCodeSituationOthers;
