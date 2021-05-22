import React, { useCallback, useEffect, useMemo } from 'react';
import history from 'libraries/history';

import { FormattedMessage, useIntl } from 'react-intl';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';

import * as actions from 'store/actions';
import * as types from 'store/types';

//import Portal from './Quiz/Portal';

import styles from './index.module.scss';
import stylesDisplay from '../index.module.scss';
import IconThreeDots from 'svgs/basic/IconThreeDots';
import IconPlay from 'svgs/basic/IconPlay';
import IconCheckCircle from 'svgs/basic/IconCheckCircle';
import IconXCircle from 'svgs/basic/IconXCircle';
import IconThumbsUp from 'svgs/basic/IconThumbsUp';
import IconThumbsDown from 'svgs/basic/IconThumbsDown';
import refineQuizRecord from './refineQuizRecord';

// import IconSort from 'svgs/basic/IconSort';
type PropsQuiz = {
  quiz: types.quiz.Quiz;
};

function Quiz({ quiz }: PropsQuiz) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const quizRecordList = useSelector((state: RootState) => state.auth.member?.quizRecordList);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const userReady = useSelector((state: RootState) => state.status.auth.user.ready);

  const onClick_Button = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const value = event.currentTarget.value;

      if (value === 'play') {
        dispatch(
          actions.quiz.return__FOCUS_QUIZ({
            quiz: quiz,
            situation: 'playing-trying',
          }),
        );
        // 단 하나만 플레이 리스트로서 대체
        dispatch(
          actions.quiz.return__REPLACE({
            keyList: ['state', 'playingIdList'],
            replacement: [quiz.id],
          }),
        );
      } else if (value === 'like' || value === 'dislike') {
        const dolike = userReady && quiz.memberReaction.likedMemberIdList.includes(userId || '');
        const doDislike =
          userReady && quiz.memberReaction.dislikedMemberIdList.includes(userId || '');
        dispatch(
          actions.quiz.return__LIKE_DISLIKE_QUIZ({
            quizId: quiz.id as string,
            like: value === 'like' ? !dolike : dolike,
            dislike: value === 'dislike' ? !doDislike : doDislike,
          }),
        );
      } else if (value === 'others') {
        dispatch(
          actions.quiz.return__REPLACE({
            keyList: ['state', 'display', 'clickedQuizId'],
            replacement: quiz.id,
          }),
        );
        dispatch(
          actions.appearance.return__REPLACE({
            keyList: ['showing', 'modal', 'quizHomeOthers'],
            replacement: true,
          }),
        );
      }
    },
    [quiz, userReady, userId],
  );

  const refinedRecord = useMemo(
    () => refineQuizRecord(quizRecordList, quiz.id, intl),
    [quizRecordList, quiz.id, intl],
  );

  const dateTextPair = useMemo(() => {
    const yearCurrent = new Date().getFullYear();

    if (quiz.createdDate) {
      const dateQC = new Date(quiz.createdDate);

      const year = dateQC.getFullYear();
      const month = dateQC.getMonth() + 1;
      const date = dateQC.getDate();
      const hour = dateQC.getHours().toString().padStart(2, '0');
      const min = dateQC.getMinutes().toString().padStart(2, '0');

      if (yearCurrent === dateQC.getFullYear()) {
        return [`${month}/${date}`, `${hour}:${min}`];
      } else {
        return [`${year}`, `${month}`];
      }
    } else {
      return '';
    }
  }, [quiz.createdDate]);

  const myReaction = useMemo(() => {
    return {
      doLike: userId && quiz.memberReaction.likedMemberIdList.includes(userId),
      doDislike: userId && quiz.memberReaction.dislikedMemberIdList.includes(userId),
    };
  }, [quiz.memberReaction, userId]);

  return (
    <tr
      className={`${styles['root']} 
            ${stylesDisplay['row']}`}
    >
      <td className={`${styles['name-id']}`}>
        <span>{quiz.name || quiz.id}</span>
      </td>

      <td className={`${styles['my-result']}`}>
        {refinedRecord && (
          <>
            <span>
              {refinedRecord.result ? (
                <IconCheckCircle className={styles['icon__solved']} kind="solid" />
              ) : (
                <IconXCircle className={styles['icon__failed']} kind="solid" />
              )}
            </span>
            <span>{refinedRecord.dateText}</span>
          </>
        )}
      </td>

      <td className={`${styles['author']}`}>
        <span>{quiz.authorName}</span>
      </td>

      <td className={`${styles['created']}`}>
        <span>{dateTextPair[0]}</span>
        <span>{dateTextPair[1]}</span>
      </td>

      <td className={`${styles['play']}`}>
        <button type="button" onClick={onClick_Button} value="play" aria-label="Play This Quiz">
          <IconPlay className={styles['icon__play']} kind="solid" />
        </button>
      </td>

      <td className={`${styles['like-dislike']}`}>
        {userId && (
          <>
            {(myReaction.doLike || !myReaction.doDislike) && (
              <button type="button" onClick={onClick_Button} value="like" aria-label="Like">
                <IconThumbsUp
                  className={`${styles['icon__like']} ${myReaction.doLike ? 'active' : ''}`}
                  kind={myReaction.doLike ? 'solid' : 'regular'}
                />
              </button>
            )}
            {(myReaction.doDislike || !myReaction.doLike) && (
              <button type="button" onClick={onClick_Button} value="dislike" aria-label="Dislike">
                <IconThumbsDown
                  className={`${styles['icon__dislike']} ${myReaction.doDislike ? 'active' : ''}`}
                  kind={myReaction.doDislike ? 'solid' : 'regular'}
                />
              </button>
            )}
          </>
        )}
      </td>

      <td className={`${styles['others']}`}>
        {userReady && (
          <button type="button" onClick={onClick_Button} value="others" aria-label="Others">
            <IconThreeDots className={styles['icon__others']} kind="regular" />
          </button>
        )}
      </td>
    </tr>
  );
}

Quiz.defaultProps = {};

export default Quiz;

{
  /* <td className={`${styles['result']}`}>
    {mode.element === 'text' ?
    <span className={`${styles['text']}`}>
        <span className={`${styles['won']}`}>{statQuiz.overall.won}</span>  
        <span className={`${styles['draw']}`}>{statQuiz.overall.draw}</span> 
        <span className={`${styles['lost']}`}>{statQuiz.overall.lost}</span>
    </span>
    :
    <span className={`${styles['graph']}`}>
        <span className={`${styles['won']}`} style={dictStyleResult['won']} />
        <span className={`${styles['draw']}`} style={dictStyleResult['draw']}/>
        <span className={`${styles['lost']}`} style={dictStyleResult['lost']}/>
    </span>
    }
</td> */
}

{
  /* <td className={`${styles['goals'] }`}>
    {mode.element === 'text' ?
    <span className={`${styles['text']}`}>
        <span className={`${styles[diffGoal.className] }`} > {diffGoal.text} </span>
        <span> { `( +${statQuiz.overall.goals_scored} / -${statQuiz.overall.goals_against} )` } </span>
    </span>
    :
    <span className={`${styles['graph']}`}>
        <span className={`${styles['scored']}`} style={dictStyleGoals['goals_scored']} />
        <span className={`${styles['against']}`} style={dictStyleGoals['goals_against']}/>
    </span>
    }
</td> */
}
