import { call, spawn, put, takeEvery, select } from "redux-saga/effects";
 
import {Banner} from "store/reducers/notification";
import {StateRoot} from 'store/reducers';

import { v4 as uuidv4 } from 'uuid';
import * as actions from "store/actions";
 
//import catalogSituation from 'language/catalogSituation';

function* deleteBanner(action: actions.notification.type__DELETE_BANNER ) {
    
    const listBannerPrevious: Banner[] =  yield select( (state:StateRoot) => state.notification.listBanner ); 
        
    const id: string = action.payload.id;
    
    const listBannerNew = listBannerPrevious.filter(banner => banner.id !== id);

    
    yield put( actions.notification.return__REPLACE({
        listKey: ['listBanner'],
        replacement: listBannerNew
    }) );
    
}

export default deleteBanner;

