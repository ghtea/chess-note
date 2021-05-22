import { call, select, put } from 'redux-saga/effects';

import history from 'libraries/history';
// import * as config from 'config';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';
import focusingChess from 'libraries/chess';

function* focusQuiz(action: actions.quiz.type__FOCUS_QUIZ) {
  const { quiz, situation: newSituation } = action.payload;

  const defaultQuiz: types.quiz.Quiz = {
    id: '',
    name: '',

    nextTurn: 'white',
    startingFen: types.quiz.defaultFen,
    correctSanSeriesList: [],
    markedSanSeriesList: [],

    authorId: '',
    authorName: '',
    isPublic: true,
    memberReaction: {
      likedMemberIdList: [],
      dislikedMemberIdList: [],
    }
  };

  const focusingQuizData: types.quiz.Quiz = quiz || defaultQuiz;

  let fenUsing = focusingQuizData.startingFen;

  if (newSituation === 'creating') {
    focusingChess.reset();
    fenUsing = focusingChess.fen();
  }

  focusingChess.load(focusingQuizData.startingFen);

  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['data', 'focusing'],
      replacement: focusingQuizData,
    }),
  );

  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['state', 'focusing'],
      replacement: {
        idGame: focusingQuizData.id,
        situation: newSituation,
        fen: fenUsing,
        turn: focusingQuizData.nextTurn,
        sanSeries: [],
      },
    }),
  );

  let modeUrl = 'play';

  if (newSituation === 'playing-trying') {
    modeUrl = 'play';
    history.push(`/quiz/${modeUrl}/${focusingQuizData.id}`);
  } else if (newSituation === 'creating') {
    modeUrl = 'create';
    history.push(`/quiz/${modeUrl}`);
  } else if (newSituation === 'editing') {
    modeUrl = 'edit';
    history.push(`/quiz/${modeUrl}/${focusingQuizData.id}`);
  }
}

export default focusQuiz;
