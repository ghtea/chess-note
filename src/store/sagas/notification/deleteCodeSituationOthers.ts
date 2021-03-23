import { delay, put, takeEvery, select } from "redux-saga/effects";

import * as actionsRoot from "store/actions";
import {StateRoot} from 'store/reducers';



function* deleteCodeSituationOthers(action: actionsRoot.notification.type__DELETE_CODE_SITUATION_OTHERS) {
    
    const listCodeSituationOthersPrevious: string[] =  yield select( (state:StateRoot) => state.notification.listCodeSituationOthers ); 
      
    
    let listCodeSituationOthersNew: string[] = listCodeSituationOthersPrevious;
    
    if (action.payload.codeSituation){
      listCodeSituationOthersNew = listCodeSituationOthersPrevious.filter(code => code !== action.payload.codeSituation);
    }
    
    else if (action.payload.regex ){
      listCodeSituationOthersNew = listCodeSituationOthersPrevious.filter(code => action.payload.regex?.test(code));
    }
    
    yield put( actionsRoot.notification.return__REPLACE({
        listKey: ['listCodeSituationOthers'],
        replacement: listCodeSituationOthersNew
    }) );
    
}

export default deleteCodeSituationOthers;
