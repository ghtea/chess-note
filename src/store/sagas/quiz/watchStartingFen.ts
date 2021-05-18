import { call, select, put } from 'redux-saga/effects';
import { firebaseFirestore } from 'libraries/firebase';

import axios from 'axios';
import apolloClient from 'libraries/apollo';
import { gql, useQuery, FetchResult } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import focusingChess from 'libraries/chess';
// import * as config from 'config';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import { waitForStateChangeToDifferentValue } from 'store/sagas/others/waitForStateChange';
import {
  correctChessMoveTree,
  markedChessMoveTree,
} from 'components/Main/Quiz/QuizEditing/chessMoveTree';

// <Route path="/quiz" >    Quiz 컴포넌트가 마운트 되자마자, return__WATCH_STARTING_FEN_CHANGE  디스패치 dispatch 한다!
function* watchFenStartChange(action: actions.quiz.type__WATCH_STARTING_FEN_CHANGE) {
  const newStartingFen: string = yield call(
    waitForStateChangeToDifferentValue,
    (state) => state.quiz.data.focusing.startingFen,
  );

  //console.log('startingFen of Quiz changed: ', newStartingFen);

  correctChessMoveTree.restart(newStartingFen);
  markedChessMoveTree.restart(newStartingFen);
  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['data', 'focusing', 'nextTurn'],
      replacement: focusingChess.turn() === 'w' ? 'white' : 'black',
    }),
  );
}

export default watchFenStartChange;
