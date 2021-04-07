import produce from 'immer';
import {handleActions} from 'redux-actions';

import * as actions from "store/actions";
import * as types from "store/types"; 

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';

export type State = typeof stateInitial;


const stateInitial = {
  
  loading: {
    user: false,
    data: {
        football: {
            leagueStandings: false,
            listTeam: false,
        },
        weather: {
            weatherOne: false,
        },
    },
  },
  
  ready: {
    user: false,
    data: {
        football: {
            leagueStandings: false,
            listTeam: false,
        },
        weather: {
            weatherOne: false,
        }
    },
    // listPortal: false,
  },
  

  current: {
    
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
      mode: 'editing' as 'editing' | 'trying' | 'solved', 
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      // side: 'white' as 'white' | 'black',
      listMove: [] as string[],
    },
  // listListMoveCorrect: string[][];
  // record: {date: string, result: boolean}[];
  },
  
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



const reducerStatus = handleActions<State, any>({
  
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





    /*
    portal: {
        open: '',
        editing: '',
        addingToStack: '',
        sorting: {
            property: 'hp' as 'hp' | 'dateVisited', 
            direction: {
                hp: 'ascending' as 'ascending' | 'descending', 
                dateVisited: 'ascending' as 'ascending' | 'descending', 
            }
        },
        hiding: {
            inStacks: false,
        },
    },
    */