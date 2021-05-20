import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import * as actions from 'store/actions';
import * as types from 'store/types';

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';
//import defaultUsingColorAssignment from '../../styles/defaultUsingColorAssignment'

// https://react-etc.vlpt.us/07.typescript-redux.html

export type State = typeof stateInitial; // 아직 불확실

const stateInitial = {
  data: {
    list: [] as types.quiz.Quiz[],
    
    focusing: {
      id: '',
      name: '',

      nextTurn: 'white',
      startingFen: '',
      correctSanSeriesList: [],
      markedSanSeriesList: [],

      authorId: '',
      authorName: '',

      isPublic: true,
      memberReaction: {
        likedMemberIdList: [],
        dislikedMemberIdList: [],
      },

    } as types.quiz.Quiz,
  },

  state: {

    situation: null as types.quiz.Situation,

    display: {
      filteringOptionList: ['my-quiz','public-quiz','i-liked','i-disliked','not-decided'] as types.quiz.FilteringOption[],
      sortingOptionList: [] as types.quiz.SortingOption[],
      clickedQuizId: '',
    },

    playingIdList: [],

    focusing: {
      fen: null,
      turn: 'white',
      sanSeries: [],
    } as types.quiz.QuizState,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const quizReducer = handleActions<State, any>(
  {
    [actions.quiz.name__REPLACE]: (previousState, action: actions.quiz.type__REPLACE) => {
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

export default quizReducer;
