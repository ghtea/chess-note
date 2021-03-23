import produce from 'immer';
import {handleActions} from 'redux-actions';


import * as actions from "store/actions";
import * as types from 'store/types'

//import { v4 as uuidv4 } from 'uuid';
import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';
//import defaultUsingColorAssignment from '../../styles/defaultUsingColorAssignment'
//import catalogSituation from 'language/catalogSituation';

//import addNotification from './notification/addNotification';

// https://react-etc.vlpt.us/07.typescript-redux.html

//export type State = typeof stateInitial;


export type Banner = {
  id: string,  
  codeSituation: string, 
  kindSituation: types.notification.KindSituation,
  idMessage: string,
  msTime: number 
}


//export type State = typeof stateInitial;


export type State = {
  listBanner: Banner[],
  listCodeSituationOthers: string[]
}


const stateInitial = {
  
  listBanner: [],
  
  listCodeSituationOthers: []
  
};



const reducerNotification = handleActions<State, any>({
  
  [actions.notification.name__REPLACE]: (statePrevious, action: actions.notification.type__REPLACE) => {
    
    return produce(statePrevious, stateNew => {
      if (action.payload === undefined) { 
        return;
      }
      else {
        const listKey: (string | number)[] = action.payload.listKey;
        
        try { putValueToNestedObject(stateNew, listKey, action.payload.replacement); 
          
        }
        catch {
          return;
        }
        
      }
      
    });
  }
 
  
}, stateInitial);



// key가 차례대로 적혀있는 list를 이용해서 object access 하기!
// https://medium.com/better-programming/4-ways-to-safely-access-nested-objects-in-vanilla-javascript-8671d09348a8

/*
const reducerNotification = (statePrevious: typeState = stateInitial, action: any): typeState => {
  switch (action.type) {
    
    case notification.REPLACE:
      
      return produce(statePrevious, stateNew => {
        if (action.payload === undefined) { 
          return;
        }
        else {
          const listKey: string[] = action.payload.listKey;
          if (Array.isArray(listKey)) {
            
            console.log(stateNew);
            
            const location = listKey.reduce( (obj: any, key: string) => {
              return obj[key]; 
            }, stateNew);
            
          }
      }
      
    });
    
    
    default:
      return statePrevious;
  }
}

*/



export default reducerNotification;


/*
const notificationReducer = handleActions({
  
  
  [notification.REPLACE_STATUS]: (state, action) => {
    //console.log('hiiii');
    
    const location = action['payload']['location'] || [];
    
    if (!location || location.length === 0) {
      return state;
    }
    else {
      return state.setIn(location, Immutable.fromJS(action['payload']['replacement']) );
    }
    
  },
  
  
}, stateInitial);

*/







