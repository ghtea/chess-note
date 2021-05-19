import { call, select, put } from 'redux-saga/effects';
import { firebaseFirestore } from 'libraries/firebase';

import axios from 'axios';
import apolloClient from 'libraries/apollo';
import { gql, useQuery, FetchResult, DocumentNode, ApolloQueryResult } from '@apollo/client';
import history from 'libraries/history';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

// GraphQL query 문법에 이상 있으면 할당하는 시점에서 에러 발생시키기 때문에 에러 처리한 곳에서 해야 한다

const requestGetMemberByUser = (query: DocumentNode, argument: Record<string, unknown>) => {
  return apolloClient.query({ query, variables: { argument } });
};

function* getMemberByUser(action: actions.auth.type__GET_MEMBER_BY_USER) {
  const { userId, userName } = action.payload;

  try {
    const gqlLiteral__GET_MEMBER_BY_USER = gql`
        query GetMemberByUser($argument: GetMemberByUserInputType!){
            getMemberByUser(getMemberByUserInputType: $argument)
              ${types.auth.gqlMemberString}
        }
    `;

    const argument = {
      userId: userId,
      userName: userName,
    };
    type GetMemberByUserData = Record<'getMemberByUser', types.auth.Member>;
    const response: ApolloQueryResult<GetMemberByUserData> = yield call(
      requestGetMemberByUser,
      gqlLiteral__GET_MEMBER_BY_USER,
      argument,
    );

    const member = response.data?.getMemberByUser;

    if (member) {
      const memberReplacement: types.auth.Member = {
        userId: member.userId,
        userName: member.userName,
        quizRecordList: member.quizRecordList.map((e) => ({
          quizId: e.quizId,
          date: e.date,
          result: e.result,
        })),
      };
      yield put(
        actions.auth.return__REPLACE({
          keyList: ['member'],
          replacement: memberReplacement,
        }),
      );
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);

    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        codeSituation: 'GetMember_UnknownError__E',
      }),
    );
  }
}

export default getMemberByUser;
