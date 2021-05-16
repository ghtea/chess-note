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

  quiz: {
    display: {
      mode: 'public-quiz' as types.present.quiz.DisplayMode,
    },

    listIdPlaying: [],
    index: null as number | null,

    focusing: {
      id: null,
      situation: 'creating',
      fen: null,
      turn: 'white',
      sanSeries: [],
    } as types.present.quiz.Quiz,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducerPresent = handleActions<State, any>(
  {
    [actions.present.name__REPLACE]: (previousState, action: actions.present.type__REPLACE) => {
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

export default reducerPresent;
