import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import * as actions from 'store/actions';
import * as types from 'store/types';

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';
//import defaultUsingColorAssignment from '../../styles/defaultUsingColorAssignment'

// https://react-etc.vlpt.us/07.typescript-redux.html

export type State = typeof stateInitial; // 아직 불확실

const stateInitial = {
  quiz: {
    myQuizList: [] as types.data.quiz.Quiz[],
    publicQuizList: [] as types.data.quiz.Quiz[],

    focusing: {
      id: null,
      name: '',

      nextTurn: 'white',
      startingFen: '',
      correctSanSeriesList: [],
      markedSanSeriesList: [],

      userId: '',
      isPublic: true,
    } as types.data.quiz.Quiz,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducerData = handleActions<State, any>(
  {
    [actions.data.name__REPLACE]: (previousState, action: actions.data.type__REPLACE) => {
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

export default reducerData;
