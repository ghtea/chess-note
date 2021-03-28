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
          toolbar: {
            height: 60
          }
        }
      }
    },

    football: {
        leagueStandings: {
            sorting: {
                listOptionActive: [ 
                    {property: 'points', direction: 'descending', isActive: true},
                    {property: 'goals_diff', direction: 'descending', isActive: true},
                ] as types.status.OptionSorting[],
                
                listOptionInactive: [ 
                    {property: 'games_played', direction: 'ascending', isActive: false},
                    {property: 'goals_scored', direction: 'descending', isActive: false},
                    {property: 'goals_against', direction: 'ascending', isActive: false}, 
                ] as types.status.OptionSorting[],
            },
            mode: {
                format: 'table' as 'table' | 'cards',
                element: 'text' as 'text' | 'graph',
            }
        }
    },

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
        
        sortingFootballLeagueStandings: false,
        // editingPortal: false,
           
        // searching: false,
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