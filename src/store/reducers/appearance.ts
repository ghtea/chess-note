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
        
        quizEditingSet: false,
        quizEditingUpload: false,
        quizEditingOthers: false,
        
        quizTryingOthers: false,
    }
  },


  layout: {
    window: {
      width: 0,
      height: 0,
    },
    document: {
      header: {
        height: 60,
      },
      chessBoard: {
        length: 0,
        top: 0,
        statusBar: {
          height: 40
        },
        toolBar: {
          height: 60
        }
      }
    }
  },
  
  
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

