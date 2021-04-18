import produce from 'immer';
import {handleActions} from 'redux-actions';

import * as actions from "store/actions";
import * as types from "store/types"; 

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';

export type State = typeof stateInitial;


const stateInitial = {
  
  
  showing: {

    header: {
        root: false,
        board: false,
    },
    footer: false,

    modal: {
        setting: false,
        myProfile: false,
        
        quizEditingSave: false,
        quizEditingUpload: false,
        quizEditingOthers: false,
        
        quizTryingOthers: false,
    }
  }
  
  
};



const reducerAppearance = handleActions<State, any>({
  
  [actions.appearance.name__REPLACE]: (statePrevious, action: actions.appearance.type__REPLACE) => {
    
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

export default reducerAppearance;
