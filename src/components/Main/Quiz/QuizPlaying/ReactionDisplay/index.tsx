import React, { useCallback, useEffect, useMemo, useState } from 'react';
import history from 'libraries/history';
import * as clipboardy from 'clipboardy';
import { FormattedMessage, useIntl } from 'react-intl';
import focusingChess from 'libraries/chess';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';

import * as actions from 'store/actions';
import * as types from 'store/types';

import styles from './index.module.scss';
import IconPaste from 'svgs/basic/IconSignIn';
import IconOthers from 'svgs/basic/IconThreeDots';
import IconThumbsUp from 'svgs/basic/IconThumbsUp';
import IconThumbsDown from 'svgs/basic/IconThumbsDown';
import refineQuizRecord from '../../QuizHome/QuizDisplay/Quiz/refineQuizRecord';
import IconXCircle from 'svgs/basic/IconXCircle';
import IconCheckCircle from 'svgs/basic/IconCheckCircle';

export default function ReactionDisplay() {
  const dispatch = useDispatch();
  const intl = useIntl();

  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const userReady = useSelector((state: RootState) => state.status.auth.user);
  const quizRecordList = useSelector((state: RootState) => state.auth.member?.quizRecordList);

  const focusingQuizData = useSelector((state: RootState) => state.quiz.data.focusing);

  const onClick_Button = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const value = event.currentTarget.value;

      if (value === 'like' || value === 'dislike') {
        const dolike =
          userReady && focusingQuizData.memberReaction.likedMemberIdList.includes(userId || '');
        const doDislike =
          userReady && focusingQuizData.memberReaction.dislikedMemberIdList.includes(userId || '');
        dispatch(
          actions.quiz.return__LIKE_DISLIKE_QUIZ({
            quizId: focusingQuizData.id as string,
            like: value === 'like' ? !dolike : dolike,
            dislike: value === 'dislike' ? !doDislike : doDislike,
          }),
        );
      }
    },
    [focusingQuizData, userReady, userId],
  );

  const myReaction = useMemo(() => {
    return {
      doLike: userId && focusingQuizData.memberReaction.likedMemberIdList.includes(userId),
      doDislike: userId && focusingQuizData.memberReaction.dislikedMemberIdList.includes(userId),
    };
  }, [focusingQuizData.memberReaction, userId]);

  const calculatedLikeNumber = useMemo(() => {
    return (
      focusingQuizData.memberReaction.likedMemberIdList.length -
      focusingQuizData.memberReaction.dislikedMemberIdList.length
    );
  }, [focusingQuizData.memberReaction]);

  const myRefinedRecord = useMemo(
    () => refineQuizRecord(quizRecordList, focusingQuizData.id, intl),
    [quizRecordList, focusingQuizData.id, intl],
  );

  return (
    <section
      className={`${styles['root']}`}
      // style={{
      //   width: chessBoardLength,
      //   height: toolbarHeight,
      // }}
    >
      <div className={`${styles['like-dislike']}`}>
        {userId ? (
          <div className={`${styles['button-pair']}`}>
            {(myReaction.doLike || !myReaction.doDislike) && (
              <button type="button" onClick={onClick_Button} value="like" aria-label="Like">
                <IconThumbsUp
                  className={styles['icon__like']}
                  kind={myReaction.doLike ? 'solid' : 'regular'}
                />
              </button>
            )}
            {(myReaction.doDislike || !myReaction.doLike) && (
              <button type="button" onClick={onClick_Button} value="dislike" aria-label="Dislike">
                <IconThumbsDown
                  className={styles['icon__dislike']}
                  kind={myReaction.doDislike ? 'solid' : 'regular'}
                />
              </button>
            )}
          </div>
        ) : (
          <div className={`${styles['button-pair']}`}>
            <button type="button" value="like" aria-label="Like">
              <IconThumbsUp className={styles['icon__like']} kind={'regular'} />
            </button>
            <button type="button" value="dislike" aria-label="Dislike">
              <IconThumbsDown className={styles['icon__dislike']} kind={'regular'} />
            </button>
          </div>
        )}
        {calculatedLikeNumber > 0 && (
          <span className={`${styles['people-like']}`}>
            {`${calculatedLikeNumber} ${intl.formatMessage({
              id: 'Main.ReactionDisplay_PeopleLike',
            })}`}
          </span>
        )}
      </div>

      <div className={`${styles['my-record']}`}>
        {myRefinedRecord ? (
          <>
            <span className={`${styles['result']}`}>
              {myRefinedRecord.result ? (
                <IconCheckCircle className={styles['icon__solved']} kind="solid" />
              ) : (
                <IconXCircle className={styles['icon__failed']} kind="solid" />
              )}
              <span>
                {myRefinedRecord.result
                  ? `${intl.formatMessage({
                      id: 'Main.ReactionDisplay_Solved',
                    })}`
                  : `${intl.formatMessage({
                      id: 'Main.ReactionDisplay_Failed',
                    })}`}
              </span>
            </span>
            <span className={`${styles['date']}`}>{myRefinedRecord.dateText}</span>
          </>
        ) : (
          <span>
            {`${intl.formatMessage({
              id: 'Main.ReactionDisplay_NotTried',
            })}`}
          </span>
        )}
      </div>
    </section>
  );
}
