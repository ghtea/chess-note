import { call, select, put } from 'redux-saga/effects';
import { firebaseFirestore } from 'libraries/firebase';

import axios from 'axios';
import apolloClient from 'libraries/apollo';
import { gql, useQuery, FetchResult } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import focusingChess from 'libraries/chess';
// import * as config from 'config';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import { waitForStateChangeToDifferentValue } from 'store/sagas/others/waitForStateChange';
import { correctChessMoveTree, markedChessMoveTree } from 'components/Main/Quiz/chessMoveTree';

// <Route path="/quiz" >    Quiz 컴포넌트가 마운트 되자마자, return__WATCH_STARTING_FEN_CHANGE  디스패치 dispatch 한다!
export default function* changeStaringFen(action: actions.quiz.type__CHANGE_STARTING_FEN) {
  const { startingFen } = action.payload;

  const focusingQuizData: types.quiz.Quiz = yield select(
    (state: RootState) => state.quiz.data.focusing,
  );
  const focusingQuizState: types.quiz.Quiz = yield select(
    (state: RootState) => state.quiz.state.focusing,
  );

  focusingChess.load(startingFen);
  correctChessMoveTree.restart(startingFen);
  markedChessMoveTree.restart(startingFen);

  const newFocusingQuizData: types.quiz.Quiz = {
    ...focusingQuizData,
    correctSanSeriesList: [],
    markedSanSeriesList: [],
    nextTurn: focusingChess.turn() === 'w' ? 'white' : 'black',
    startingFen: startingFen,
  };
  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['data', 'focusing'],
      replacement: newFocusingQuizData,
    }),
  );

  const newFocusingQuizState: types.quiz.QuizState = {
    ...focusingQuizState,
    fen: startingFen,
    sanSeries: [],
    turn: focusingChess.turn() === 'w' ? 'white' : 'black',
  };

  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['state', 'focusing'],
      replacement: newFocusingQuizState,
    }),
  );
}
