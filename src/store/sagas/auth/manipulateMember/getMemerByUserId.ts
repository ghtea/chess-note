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

const requestGetMemberByUserId = (query: DocumentNode, argument: Record<string, unknown>) => {
  return apolloClient.query({ query, variables: { argument } });
};

function* getMemberByUserId(action: actions.auth.type__GET_MEMBER_BY_USER_ID) {
  const { userId } = action.payload;

  try {
    const gqlLiteral__GET_MEMBER_BY_USER_ID = gql`
        query GetMemberByUserId($argument: GetMemberByUserIdInputType!){
            getMemberByUserId(getMemberByUserIdInputType: $argument)
              ${types.auth.gqlMemberString}
        }
    `;

    const argument = {
      userId: userId,
    };
    type GetMemberByUserIdData = Record<'getMemberByUserId', types.auth.Member>;
    const response: ApolloQueryResult<GetMemberByUserIdData> = yield call(
      requestGetMemberByUserId,
      gqlLiteral__GET_MEMBER_BY_USER_ID,
      argument,
    );

    const member = response.data?.getMemberByUserId;

    if (member) {
      const memberReplacement = {
        userId: member.userId,
        quizRecordList: member.quizRecordList,
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

export default getMemberByUserId;
