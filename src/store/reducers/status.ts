import {produce} from 'immer';
import {handleActions} from 'redux-actions';

import * as actions from "store/actions";
import * as types from "store/types"; 

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';

export type State = typeof stateInitial;


const stateInitial = {
  
  auth: {
    user: { tried: false, loading: false, ready: false },
  },

  data: {
      quiz: {
        listPublicQuiz: { tried: false, loading: false, ready: false },
        listMyQuiz: { tried: false, loading: false, ready: false },
        
        list: { tried: false, loading: false, ready: false },
        one: { tried: false, loading: false, ready: false },
      }
  },
  
};



const reducerStatus = handleActions<State, any>({ // eslint-disable-line @typescript-eslint/no-explicit-any
  
  [actions.status.name__REPLACE]: (statePrevious, action: actions.status.type__REPLACE) => {
    
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

export default reducerStatus;



