import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import * as actions from 'store/actions';
import * as types from 'store/types';

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';
//import defaultUsingColorAssignment from '../../styles/defaultUsingColorAssignment'

// https://react-etc.vlpt.us/07.typescript-redux.html

export type State = typeof stateInitial; // 아직 불확실

const stateInitial = {
  user: null as types.auth.User | null,
  member: null as types.auth.Member | null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducerAuth = handleActions<State, any>(
  {
    [actions.auth.name__REPLACE]: (previousState, action: actions.auth.type__REPLACE) => {
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
const reducerAuth = (previousState: typeState = stateInitial, action: any): typeState => {
  switch (action.type) {
    
    case auth.REPLACE:
      
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

export default reducerAuth;

/*
const authReducer = handleActions({
  
  
  [auth.REPLACE_STATUS]: (state, action) => {
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
