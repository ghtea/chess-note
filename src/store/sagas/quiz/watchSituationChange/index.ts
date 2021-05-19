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
export default function* watchSituationChange(
  action: actions.quiz.type__WATCH_STARTING_FEN_CHANGE,
) {
  while (true) { // without this, this root saga run only once
    const newSituation: types.quiz.Situation = yield call(
      waitForStateChangeToDifferentValue,
      (state) => state.quiz.state.situation,
    );
    // console.warn('hello! situation changed!!: ', newSituation);

    if (newSituation === 'playing-failed' || newSituation === 'playing-solved') {
      const member: types.auth.Member = yield select((state: RootState) => state.auth.member);
      const quizId: string = yield select((state: RootState) => state.quiz.data.focusing.id);
      if (member) {
        const quizRecord = member.quizRecordList.find((e) => e.quizId === quizId);
        if (quizRecord) {
          if (checkIfLastestRecordIsFarEnough(quizRecord, 1000 * 60 * 60 * 12)) {
            yield replaceQuizRecordList(member.quizRecordList, quizId, newSituation);
          }
        }
        else {
          yield replaceQuizRecordList(member.quizRecordList, quizId, newSituation);
        }
      }
    }
  }

  // yield put(
  //   actions.quiz.return__REPLACE({
  //     keyList: ['data', 'focusing', 'nextTurn'],
  //     replacement: focusingChess.turn() === 'w' ? 'white' : 'black',
  //   }),
  // );
}

function checkIfLastestRecordIsFarEnough(quizRecord: types.auth.QuizRecord, standardMs: number) {
  const diff = Date.now() - quizRecord.date;
  if (diff >= standardMs) {
    return true;
  } else {
    return false;
  }
}

function* replaceQuizRecordList(
  previousQuizRecordList: types.auth.QuizRecord[],
  quizId: string,
  newSituation: types.quiz.Situation,
) {
  let newQuizRecordList = [...previousQuizRecordList];
  newQuizRecordList = newQuizRecordList.filter((e) => e.quizId !== quizId);

  newQuizRecordList.push({
    date: Date.now(),
    quizId: quizId,
    result: newSituation === 'playing-solved' ? true : false,
  });

  yield put(
    actions.auth.return__REPLACE({
      keyList: ['member', 'quizRecordList'],
      replacement: newQuizRecordList,
    }),
  );
}
