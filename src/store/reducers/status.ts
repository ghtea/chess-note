import { produce } from 'immer';
import { handleActions } from 'redux-actions';

import * as actions from 'store/actions';
import * as types from 'store/types';

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';

export type State = typeof stateInitial;

const stateInitial = {
  auth: {
    user: { tried: false, loading: false, ready: false },
  },

  data: {
    quiz: {
      publicQuizList: { tried: false, loading: false, ready: false },
      myQuizList: { tried: false, loading: false, ready: false },

      list: { tried: false, loading: false, ready: false },
      one: { tried: false, loading: false, ready: false },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducerStatus = handleActions<State, any>(
  {
    [actions.status.name__REPLACE]: (previousState, action: actions.status.type__REPLACE) => {
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

export default reducerStatus;
