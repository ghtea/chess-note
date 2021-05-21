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
import checkIfAuthorizedUserIsLoggedInUser from '../common/checkIfAuthorizedUserIsLoggedInUser';

const UPDATE_MEMBER = gql`
  mutation UpdateMember($argument: UpdateMemberInputType!){
    updateMember(updateMemberInputType: $argument) 
        ${types.auth.gqlMemberString}
  }
`;

const requestUpdateMember = (argument: Record<string, unknown>) => {
  return apolloClient.mutate({ mutation: UPDATE_MEMBER, variables: { argument } });
};

// directly access to sportdataAPI -> update firebase (get document on return)
export default function* updateMember(action: actions.auth.type__UPDATE_MEMBER) {
  const { userId, userName, quizRecordList } = action.payload;

  if (!checkIfAuthorizedUserIsLoggedInUser(userId)) return;

  try {
    const argument = {
      userId,
      userName,
      quizRecordList,
    };
    type UpdateQuizData = Record<'updateMember', types.auth.Member>;
    const response: ApolloQueryResult<UpdateQuizData> = yield call(requestUpdateMember, argument); // eslint-disable-line @typescript-eslint/no-explicit-any

    // 여기서 받아온걸 다시 적용하면, 다시 Member가 수정되므로 계속 반복된다....
  } catch (error) {
    console.error(error);

    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: 'UpdateMember_UnknownError__E',
      }),
    );
  }
} // else
