import { produce } from 'immer';
import { handleActions } from 'redux-actions';

import * as actions from 'store/actions';
import * as types from 'store/types';

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';

export type State = typeof stateInitial;

const stateInitial = {
  language: '', // en, ko, ja    , it should be blank at first check cookie first (call DETECT_LANGUAGE)

  theme: {
    option: 'always-light',
    name: 'light',
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

      quizHomeOthers: false,

      quizEditingSet: false,
      quizEditingUpload: false,
      quizEditingOthers: false,

      quizPlayingOthers: false,

      quizManageAnswers: false,
      quizManageMarks: false,
    },
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
      entireBoard: {
        chessBoard: {
          length: 100,
          position: {
            x: 0,
            y: 0,
          },
        },
        statusBar: {
          height: 40,
        },
        toolBar: {
          height: 60,
        },
      },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appearanceReducer = handleActions<State, any>(
  {
    [actions.appearance.name__REPLACE]: (
      previousState,
      action: actions.appearance.type__REPLACE,
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

export default appearanceReducer;
