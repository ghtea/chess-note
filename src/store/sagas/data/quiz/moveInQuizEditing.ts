import { call, select, put } from 'redux-saga/effects';
//import { firebaseFirestore } from "firebaseApp";

import { ChessInstance, Move, Square } from 'chess.js';
import chessFocusing from 'libraries/chess';

// import * as config from 'config';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

function* moveInQuizEditing(action: actions.data.quiz.type__MOVE_IN_QUIZ_EDITING) {
  const { from, to, san } = action.payload;

  const quizPresent: types.present.quiz.Quiz = yield select(
    (state: StateRoot) => state.present.quiz.focusing,
  );

  try {
    let result = null;

    if (san) {
      result = chessFocusing.move(san);
    } else {
      result = chessFocusing.move({ from: from as Square, to: to as Square });
    }

    // if move was valid
    if (result) {
      // const fen = chessFocusing.fen();

      const replacement = {
        ...quizPresent,
        fen: chessFocusing.fen(),
        turn: chessFocusing.turn() === 'w' ? 'white' : 'black',
        sanSeries: [...quizPresent.sanSeries, result.san],
      };

      yield put(
        actions.present.return__REPLACE({
          keyList: ['quiz', 'focusing'],
          replacement,
        }),
      );
    } else {
      console.log('move was not valid');
    }
  } catch (error) {
    console.error(error);

    // yield put( actions.notification.return__ADD_DELETE_BANNER({
    //     codeSituation: 'CreateQuiz_UnknownError__E'
    // }) );
  }
}

export default moveInQuizEditing;
