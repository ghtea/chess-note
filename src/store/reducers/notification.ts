import { produce } from 'immer';
import { handleActions } from 'redux-actions';

import * as actions from 'store/actions';
import * as types from 'store/types';

//import { v4 as uuidv4 } from 'uuid';
import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';
//import defaultUsingColorAssignment from '../../styles/defaultUsingColorAssignment'
//import catalogSituation from 'language/catalogSituation';

//import addNotification from './notification/addNotification';

// https://react-etc.vlpt.us/07.typescript-redux.html

//export type State = typeof stateInitial;

export type Banner = {
  id: string;
  situationCode: string;
  situationKind: types.notification.KindSituation;
  messageId: string;
  messageValues?: Record<string, React.ReactNode>;
  msTime: number;
};

//export type State = typeof stateInitial;

export type State = {
  bannerList: Banner[];
  otherSituationCodeList: string[];
};

const stateInitial = {
  bannerList: [],

  otherSituationCodeList: [],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notificationReducer = handleActions<State, any>(
  {
    [actions.notification.name__REPLACE]: (
      previousState,
      action: actions.notification.type__REPLACE,
    ) => {
      return produce(previousState, (newState) => {
        if (action.payload === undefined) {
          return;
        } else {
          const keyList: (string | number)[] = action.payload.keyList;

          try {
            putValueToNestedObject(newState, keyList, action.payload.replacement);
          } catch {
            return;
          }
        }
      });
    },
  },
  stateInitial,
);

// key가 차례대로 적혀있는 list를 이용해서 object access 하기!
// https://medium.com/better-programming/4-ways-to-safely-access-nested-objects-in-vanilla-javascript-8671d09348a8

/*
const notificationReducer = (previousState: typeState = stateInitial, action: any): typeState => {
  switch (action.type) {
    
    case notification.REPLACE:
      
      return produce(previousState, newState => {
        if (action.payload === undefined) { 
          return;
        }
        else {
          const keyList: string[] = action.payload.keyList;
          if (Array.isArray(keyList)) {
            
            console.log(newState);
            
            const location = keyList.reduce( (obj: any, key: string) => {
              return obj[key]; 
            }, newState);
            
          }
      }
      
    });
    
    
    default:
      return previousState;
  }
}

*/

export default notificationReducer;

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
