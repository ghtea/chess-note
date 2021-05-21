import React, { useCallback, useEffect, useMemo } from 'react';
import history from 'libraries/history';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

import Loading from 'components/Global/Loading';

//import actions from 'store/actions';

//import Portal from './QuizDisplay/Portal';

import styles from './index.module.scss';
import Quiz from './Quiz';
import InputRadio from 'components/Global/Input/InputRadio';
import getFilteredSortedQuizList from './getFilteredSortedQuizList';
import IconThumbsDown from 'svgs/basic/IconThumbsDown';
import IconThumbsUp from 'svgs/basic/IconThumbsUp';
import IconCircle from 'svgs/basic/IconCircle';
import IconCheckCircle from 'svgs/basic/IconCheckCircle';
import IconXCircle from 'svgs/basic/IconXCircle';

function QuizDisplay() {
  const dispatch = useDispatch();
  // const userReady = useSelector((state: RootState) => state.status.auth.user.ready);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const member = useSelector((state: RootState) => state.auth.member);

  const userReady = useSelector((state: RootState) => state.status.auth.user.ready);

  const quizListStatus = useSelector((state: RootState) => state.status.data.quiz.list);
  const quizList = useSelector((state: RootState) => state.quiz.data.list);

  // const sorting = useSelector((state: RootState)=>state.status.current.football.leagueStandings.sorting);
  const displayState = useSelector((state: RootState) => state.quiz.state.display);

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

  const onClick_FilteringOptionButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const {
        currentTarget: { name, value },
      } = event;

      if (name === 'filteringOption') {
        let replacement = [...displayState.filteringOptionList];
        const foundIndex = displayState.filteringOptionList.findIndex(
          (e) => e === (value as types.quiz.FilteringOption),
        );
        if (foundIndex === -1) {
          replacement.push(value as types.quiz.FilteringOption);
        } else {
          replacement = replacement.filter((e) => e !== value);
        }
        dispatch(
          actions.quiz.return__REPLACE({
            keyList: ['state', 'display', 'filteringOptionList'],
            replacement: replacement,
          }),
        );
      }
    },
    [displayState.filteringOptionList],
  );

  useEffect(() => {
    const result = getFilteredSortedQuizList(
      quizList,
      displayState.filteringOptionList,
      displayState.sortingOptionList,
      userId,
      member,
    );
    dispatch(
      actions.quiz.return__REPLACE({
        keyList: ['state', 'display', 'arrangedIdList'],
        replacement: result.map((e) => e.id),
      }),
    );
  }, [quizList, displayState.filteringOptionList, displayState.sortingOptionList, userId, member]);

  const filteredSortedQuizList = useMemo(() => {
    return displayState.arrangedIdList
      .map((eachId) => {
        return quizList.find((eachQuiz) => eachQuiz.id === eachId);
      })
      .filter((e) => e !== undefined) as types.quiz.Quiz[];
  }, [quizList, displayState.arrangedIdList]);

  return (
    <section className={`${styles['root']}`}>
      <div className={`${styles['options']}`}>
        {userReady && (
          <div className={`${styles['public-my']}`}>
            <button
              className={`${displayState.filteringOptionList.includes('public-quiz') && 'active'}`}
              name="filteringOption"
              value={'public-quiz'}
              aria-label={'Public Quiz'}
              onClick={onClick_FilteringOptionButton}
            >
              <FormattedMessage id="Main.QuizHome_QuizDisplay_PublicQuiz" />
            </button>
            <button
              className={`${displayState.filteringOptionList.includes('my-quiz') && 'active'}`}
              name="filteringOption"
              value={'my-quiz'}
              aria-label={'My Quiz'}
              onClick={onClick_FilteringOptionButton}
            >
              <FormattedMessage id="Main.QuizHome_QuizDisplay_MyQuiz" />
            </button>
          </div>
        )}
        {userReady && (
          <div className={`${styles['like-dislike']}`}>
            <button
              className={`${displayState.filteringOptionList.includes('i-liked') ? 'active' : ''}`}
              name="filteringOption"
              value={'i-liked'}
              aria-label={'I liked'}
              onClick={onClick_FilteringOptionButton}
            >
              <IconThumbsUp className={styles['icon__i-liked']} kind="solid" />
            </button>
            <button
              className={`${
                displayState.filteringOptionList.includes('not-decided') ? 'active' : ''
              }`}
              name="filteringOption"
              value={'not-decided'}
              aria-label={'Not decided'}
              onClick={onClick_FilteringOptionButton}
            >
              <IconCircle className={styles['icon__not-decided']} kind="regular" />
            </button>
            <button
              className={`${
                displayState.filteringOptionList.includes('i-disliked') ? 'active' : ''
              }`}
              name="filteringOption"
              value={'i-disliked'}
              aria-label={'I disliked'}
              onClick={onClick_FilteringOptionButton}
            >
              <IconThumbsDown className={styles['icon__i-disliked']} kind="solid" />
            </button>
          </div>
        )}

{userReady && (
          <div className={`${styles['solved-failed']}`}>
            <button
              className={`${displayState.filteringOptionList.includes('i-solved') ? 'active' : ''}`}
              name="filteringOption"
              value={'i-liked'}
              aria-label={'I liked'}
              onClick={onClick_FilteringOptionButton}
            >
              <IconCheckCircle className={styles['icon__i-solved']} kind="solid" />
            </button>
            <button
              className={`${
                displayState.filteringOptionList.includes('not-tried') ? 'active' : ''
              }`}
              name="filteringOption"
              value={'not-tried'}
              aria-label={'Not tried'}
              onClick={onClick_FilteringOptionButton}
            >
              <IconCircle className={styles['icon__not-tried']} kind="regular" />
            </button>
            <button
              className={`${
                displayState.filteringOptionList.includes('i-failed') ? 'active' : ''
              }`}
              name="filteringOption"
              value={'i-failed'}
              aria-label={'I failed'}
              onClick={onClick_FilteringOptionButton}
            >
              <IconXCircle className={styles['icon__i-failed']} kind="solid" />
            </button>
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

      {quizListStatus.loading && <Loading />}

      {quizListStatus.ready && (
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
              <th scope="col">
                <span></span>
                <span></span>
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSortedQuizList.map((quizEach: types.quiz.Quiz, index: number) => (
              <Quiz quiz={quizEach} key={`Quiz-${quizEach.id}`} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

QuizDisplay.defaultProps = {};

export default QuizDisplay;
