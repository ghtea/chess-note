import produce from 'immer';
import {handleActions} from 'redux-actions';

import * as actions from "store/actions";
import * as types from "store/types"; 

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';

export type State = typeof stateInitial;


const stateInitial = {
  
  language: '',   // en, ko, ja    , it should be blank at first check cookie first (call DETECT_LANGUAGE)
  
  theme: {
      option: 'always-light',
      name: 'light'
  },

  size: {
    window: {
      innerWidth: 0,
      innerHeight: 0,
    },
    document: {
      header: {
        height: 60,
      },
      chessBoard: {
        length: 0,
        toolbar: {
          height: 60
        }
      }
    }
  },

  quiz: {
    idGame: null as null | string,
    mode: 'creating' as 'editing' | 'playing' | 'solved' | 'creating', 
    fen: null as null | string,
    turn: 'white' as 'white' | 'black',
    //fenToLoad: null as null | string,
    // side: 'white' as 'white' | 'black',
    listMove: [] as string[],
  },
  
  
  
};



const reducerPresent = handleActions<State, any>({
  
  [actions.present.name__REPLACE]: (statePrevious, action: actions.present.type__REPLACE) => {
    
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

export default reducerPresent;



