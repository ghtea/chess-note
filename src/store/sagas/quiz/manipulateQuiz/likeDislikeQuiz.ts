import { call, select, put } from 'redux-saga/effects';
import { firebaseFirestore } from 'libraries/firebase';

import history from 'libraries/history';

import axios from 'axios';
import apolloClient from 'libraries/apollo';
import { gql, useQuery, FetchResult, ApolloQueryResult } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

const LIKE_DISLIKE_QUIZ = gql`
    mutation LikeDislikeQuiz($argument: LikeDislikeQuizInputType!){
        likeDislikeQuiz(likeDislikeQuizInput: $argument) 
            ${types.quiz.gqlQuizString}
    }
`;

const requestLikeDislikeQuiz = (argument: Record<string, unknown>) => {
  return apolloClient.mutate({ mutation: LIKE_DISLIKE_QUIZ, variables: { argument } });
};

// directly access to sportdataAPI -> update firebase (get document on return)
export default function* likeDislikeQuiz(action: actions.quiz.type__LIKE_DISLIKE_QUIZ) {
  const { quizId, like, dislike } = action.payload;
  const userIdInApp: undefined | string = yield select((state: RootState) => state.auth.user?.id);
  // 권한은 서버쪽에서 확인

  if (!userIdInApp) {
    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: 'NotLoggedIn__E',
      }),
    );
    return;
  }

  try {
    const newMemberReaction = {};
    yield applyQuizMemberReactionChange(quizId, like, dislike, userIdInApp);

    const argument = {
      like,
      dislike,
      quizId,
      userId: userIdInApp,
    };

    type LikeDislikeQuizData = Record<'likeDislikeQuiz', types.quiz.Quiz>;
    const res: ApolloQueryResult<LikeDislikeQuizData> = yield call(
      requestLikeDislikeQuiz,
      argument,
    ); // eslint-disable-line @typescript-eslint/no-explicit-any

    // yield put(
    //   actions.notification.return__ADD_DELETE_BANNER({
    //     situationCode: 'LikeDislikeQuiz_Succeeded__S',
    //   }),
    // );

    // console.log(res)

    // const quizFromRes = res.data.likeDislikeQuiz;
  } catch (error) {
    console.error(error);

    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: 'LikeDislikeQuiz_UnknownError__E',
      }),
    );
  }
} // else

function* applyQuizMemberReactionChange(
  quizId: string,
  like: boolean,
  dislike: boolean,
  userId: string,
) {
  const situation: types.quiz.Situation = yield select(
    (state: RootState) => state.quiz.state.situation,
  );

  // quizList
  const quizList: types.quiz.Quiz[] = yield select((state: RootState) => state.quiz.data.list);

  const quizToEdit = quizList.find((e) => e.id === quizId);
  const newQuizList = quizList.filter((e) => e.id !== quizId);

  if (quizToEdit) {
    const newMemberReaction: types.quiz.MemberReaction = { ...quizToEdit.memberReaction };

    newMemberReaction.likedMemberIdList = newMemberReaction.likedMemberIdList.filter(
      (e) => e !== userId,
    );
    newMemberReaction.dislikedMemberIdList = newMemberReaction.dislikedMemberIdList.filter(
      (e) => e !== userId,
    );
    if (like) {
      newMemberReaction.likedMemberIdList = newMemberReaction.likedMemberIdList.concat([userId]);
    }
    if (dislike) {
      newMemberReaction.dislikedMemberIdList = newMemberReaction.dislikedMemberIdList.concat([
        userId,
      ]);
    }

    newQuizList.push({
      ...quizToEdit,
      memberReaction: newMemberReaction,
    });
  }

  yield put(
    actions.quiz.return__REPLACE({
      keyList: ['data', 'list'],
      replacement: newQuizList,
    }),
  );


  // focusingQuiz
  const focusingQuiz: types.quiz.Quiz = yield select((state: RootState) => state.quiz.data.focusing);
  if (
    situation === 'editing' ||
    situation === 'playing-trying' ||
    situation === 'playing-solved' ||
    situation === 'playing-failed'
  ){
    const newMemberReaction: types.quiz.MemberReaction = { ...focusingQuiz.memberReaction };

    newMemberReaction.likedMemberIdList = newMemberReaction.likedMemberIdList.filter(
      (e) => e !== userId,
    );
    newMemberReaction.dislikedMemberIdList = newMemberReaction.dislikedMemberIdList.filter(
      (e) => e !== userId,
    );
    if (like) {
      newMemberReaction.likedMemberIdList = newMemberReaction.likedMemberIdList.concat([userId]);
    }
    if (dislike) {
      newMemberReaction.dislikedMemberIdList = newMemberReaction.dislikedMemberIdList.concat([
        userId,
      ]);
    }

    yield put(
      actions.quiz.return__REPLACE({
        keyList: ['data', 'focusing'],
        replacement: {
          ...focusingQuiz,
          memberReaction: newMemberReaction,
        },
      }),
    );
    }
  // 다음으로 만약 현재 포커스 중인게 있다면 거기에 (단, creating 인 상태면 적용안한다)
}
