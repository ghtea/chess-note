import { call, select, put, getContext } from 'redux-saga/effects';
import firebase, { firebaseAuth, firebaseStorage } from 'libraries/firebase';

import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import * as types from 'store/types';

import * as actionsPortal from 'store/actions/quiz';
//import * as actionsTheme from "../../actions/theme";

const uploadPhoto = (refFirebase: firebase.storage.Reference, urlPhotoLocal: string) => {
  return refFirebase.putString(urlPhotoLocal, 'data_url');
};
const getUrlPhotoFirebase = async (response: firebase.storage.UploadTask) => {
  return (await response).ref.getDownloadURL();
};
const updateProfileFirebase = (update: {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
}) => {
  return firebaseAuth?.currentUser?.updateProfile(update);
};

function* updateProfile(action: actions.auth.type__UPDATE_PROFILE) {
  const userReady: boolean = yield select((state: RootState) => state.status.auth.user.ready);
  const userIdInApp: undefined | string = yield select((state: RootState) => state.auth.user?.id);

  try {
    if (!userReady) {
      yield put(
        actions.notification.return__ADD_DELETE_BANNER({
          situationCode: 'NotLoggedIn__E',
        }),
      );
    } else {
      /*
        else if (action.payload.initials.length > 3) {
            yield put( actionsNotification.return__ADD_DELETE_BANNER({
                situationCode: 'Portal_InitialsTooLong__E'
            }) );
        }
        */
      // let userFirebase = firebaseAuth.currentUser;
      const {
        payload: { displayName, urlPhotoLocal },
      } = action;

      const update: Record<string, unknown> = {};

      if (displayName) {
        update['displayName'] = displayName;
      }

      if (urlPhotoLocal) {
        const refFirebase = firebaseStorage.ref().child(`${userIdInApp}/${uuidv4()}`);

        const response: firebase.storage.UploadTask = yield call(
          uploadPhoto,
          refFirebase,
          urlPhotoLocal,
        ); // upload photo
        const urlPhotoFirebase: string = yield call(getUrlPhotoFirebase, response);

        update['photoURL'] = urlPhotoFirebase;
      }

      yield call(updateProfileFirebase, update);
      yield put(actions.auth.return__REPLACE_USER());

      console.log('updateProfile worked successfully!');
    }
  } catch (error) {
    console.error(error);
    console.error('updateProfile has been failed');

    yield put(
      actions.notification.return__ADD_DELETE_BANNER({
        situationCode: 'UnknownError__E',
      }),
    );
  }
}

export default updateProfile;
