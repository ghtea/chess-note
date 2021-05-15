import {produce} from 'immer';
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



  quiz:{
    display: {
      mode: 'public-quiz' as types.present.quiz.ModeDisplay,
    },

    listIdPlaying: [],

    focusing: {
      idGame: null,
      situation: 'creating', 
      fen: null,
      turn: 'white',
      seriesSan: [],
    } as types.present.quiz.Quiz,
  }
  
  
};



const reducerPresent = handleActions<State, any>({ // eslint-disable-line @typescript-eslint/no-explicit-any
  
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



