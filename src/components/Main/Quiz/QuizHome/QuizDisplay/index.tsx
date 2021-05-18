import React, { useCallback, useEffect, useMemo } from 'react';
import history from 'libraries/history';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { StateRoot } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

import Loading from 'components/Global/Loading';

//import actions from 'store/actions';

//import Portal from './QuizDisplay/Portal';

import styles from './index.module.scss';
import Quiz from './Quiz';
import InputRadio from 'components/Global/Input/InputRadio';

function QuizDisplay() {
  const dispatch = useDispatch();
  // const userReady = useSelector((state: StateRoot) => state.status.auth.user.ready);

  const userReady = useSelector((state: StateRoot) => state.status.auth.user.ready);

  const statusListMyPublic = useSelector(
    (state: StateRoot) => state.status.data.quiz.publicQuizList,
  );
  const statusListMyQuiz = useSelector((state: StateRoot) => state.status.data.quiz.myQuizList);

  const publicQuizList = useSelector((state: StateRoot) => state.quiz.data.publicQuizList);
  const myQuizList = useSelector((state: StateRoot) => state.quiz.data.myQuizList);

  // const sorting = useSelector((state: StateRoot)=>state.status.current.football.leagueStandings.sorting);
  const mode = useSelector((state: StateRoot) => state.quiz.state.display.mode);

  // 이전에 QuizDisplay 화면에서 클릭했던 게 있으면 지우기
  useEffect(() => {
    return () => {
      dispatch(
        actions.quiz.return__REPLACE({
          keyList: ['state', 'display', 'clickedQuizId'],
          replacement: '',
        }),
      );
    };
  }, []);

  const onClick_Option = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { value } = event.currentTarget;
    console.log(value);
  }, []);

  const onChange_OptionInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;

    if (name === 'mode') {
      dispatch(
        actions.quiz.return__REPLACE({
          keyList: ['state', 'display', 'mode'],
          replacement: value,
        }),
      );
    }
  }, []);

  type Draft = {
    mode: {
      value: types.quiz.DisplayMode;
      label: string;
    }[];
  };
  const draft = useMemo(() => {
    const result: Draft = {
      mode: [],
    };

    result['mode'] = [
      { value: 'public-quiz', label: 'Public Quiz' },
      { value: 'my-quiz', label: 'My Quiz' },
    ];
    return result;
  }, []);

  return (
    <section className={`${styles['root']}`}>
      <div className={`${styles['options']}`}>
        {userReady && (
          <div className={'container__input-radio'}>
            {draft.mode.map((e) => (
              <InputRadio
                valueCurrent={mode}
                name="mode"
                value={e.value}
                label={e.label}
                onChange={onChange_OptionInput}
                key={`InputRadio__mode----${e.value}`}
              />
            ))}
          </div>
        )}

        {/* <button
                className={`${styles['sorting']}`}
                type='button'
                value='sortingFootballLeagueStandings'
                onClick={onClick_ShowModal}
            >
                <IconSort className={`${styles['icon__sort']}`} />
            </button>

            <button
                className={`${styles['mode-element']}`}
                type='button'
                value={mode.element === 'text' ? 'graph' : 'text'}
                onClick={onClick_ChangeMode}
            >
                {mode.element === 'text' ? 
                <IconText className={`${styles['icon__text']}`} /> 
                : 
                <IconGraph className={`${styles['icon__graph']}`} /> 
                }
            </button> */}
      </div>

      {statusListMyPublic.loading && <Loading />}

      {statusListMyPublic.ready && (
        <table className={`${styles['table']}`} aria-label="Display of Quiz">
          <thead>
            <tr className={`${styles['row']}`}>
              <th scope="col">
                <span>ID</span>
                <span>ID</span>
              </th>
              <th scope="col">
                <span></span>
                <span>My Result</span>
              </th>
              <th scope="col">
                <span>Author</span>
                <span>Author</span>
              </th>
              <th scope="col">
                <span></span>
                <span>Created</span>
              </th>
              <th scope="col">
                <span></span>
                <span>Play</span>
              </th>
              <th scope="col">
                <span></span>
                <span></span>
              </th>
            </tr>
          </thead>

          <tbody>
            {(mode === 'my-quiz' ? myQuizList : publicQuizList).map(
              (quizEach: types.quiz.Quiz, index: number) => (
                <Quiz quiz={quizEach} key={`Quiz-${index}`} />
              ),
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}

QuizDisplay.defaultProps = {};

export default QuizDisplay;
