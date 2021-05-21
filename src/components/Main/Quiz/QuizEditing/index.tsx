import ChessBoard from 'components/Global/ChessBoard';
import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ChessInstance, Move, Square } from 'chess.js';
import chessPlaying from 'libraries/chess';
import styles from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import EntireBoard from './EntireBoard';
import ReactionDisplay from '../QuizPlaying/ReactionDisplay';

export default function QuizEditing() {
  //const dispatch = useDispatch();

  const situation = useSelector((state: RootState) => state.quiz.state.situation);

  return (
    <div className={`${styles['root']}`}>
      <EntireBoard />
      {situation !== 'creating' && <ReactionDisplay />}
    </div>
  );
}
