import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';

import history from 'libraries/history';
import { useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';

import convertCase from 'tools/vanilla/convertCase';
import useInput from 'tools/hooks/useInput';

import IconX from 'svgs/basic/IconX';

import styles from './index.module.scss';
import stylesModal from 'components/Modal/index.module.scss';
import InputText from 'components/Global/Input/InputText';
import IconEdit from 'svgs/basic/IconEdit';

function MyProfile() {
  const dispatch = useDispatch();
  const intl = useIntl();

  const user = useSelector((state: RootState) => state.auth.user);

  const [urlPhotoLocal, setUrlPhotoLocal] = useState('');

  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState(user?.name || '');

  const onClick_CloseModal = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { value } = event.currentTarget;
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', value],
          replacement: false,
        }),
      );
    },
    [],
  );

  const refModal = useRef<HTMLDivElement>(null);
  const onClick_Window = useCallback(
    (event: MouseEvent) => {
      if (!refModal.current?.contains(event.target as Node)) {
        dispatch(
          actions.appearance.return__REPLACE({
            keyList: ['showing', 'modal', convertCase('MyProfile', 'camel')],
            replacement: false,
          }),
        );
      }
    },
    [refModal],
  );
  useEffect(() => {
    // close sub menu when click outside of menu
    window.addEventListener('click', onClick_Window);
    return () => window.removeEventListener('click', onClick_Window);
  }, [onClick_Window]);

  const onChange_InputFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;
    const theFile = files && files[0];
    if (theFile) {
      const reader = new FileReader();

      reader.onloadend = (finishedEvent) => {
        const result = finishedEvent?.target?.result || undefined;
        //const { currentTarget: { result }} = finishedEvent;
        setUrlPhotoLocal(result as string);
      };
      reader.readAsDataURL(theFile); // then onloadend is triggered
    }
  }, []);
  const onClick_InputFile = useCallback((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.currentTarget.value = '';
  }, []);
  const onClick_ClearInputFile = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setUrlPhotoLocal('');
    },
    [],
  );

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(
        actions.auth.return__UPDATE_PROFILE({
          urlPhotoLocal: urlPhotoLocal,
          displayName: editingName,
        }),
      );
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['showing', 'modal', convertCase('MyProfile', 'camel')],
          replacement: false,
        }),
      );
    },
    [urlPhotoLocal, editingName],
  );

  const onClick_LogOut = useCallback(() => {
    dispatch(actions.auth.return__LOG_OUT());
  }, []);

  const onChange_EditingName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.currentTarget.value)
      setEditingName(event.currentTarget.value);
    },
    [setEditingName],
  );
  useEffect(()=>{
    if (isEditingName){
      setEditingName(user?.name || '');
    }
    else {
      setEditingName(user?.name || '');
    }
  },[isEditingName, setEditingName, user?.name])

  return (
    <div className={`${styles['root']} ${stylesModal['root']}`}>
      <div className={`${stylesModal['outside']}`} aria-label="Outside MyProfile" />

      <div
        className={`${stylesModal['modal']}`}
        role="dialog"
        aria-labelledby="Heading_MyProfile"
        ref={refModal}
      >
        <div className={`${stylesModal['header']}`}>
          <h2 id="Heading_MyProfile">
            <FormattedMessage id={`Modal.MyProfile_Title`} />
          </h2>
          <button
            type="button"
            aria-label="Close MyProfile"
            aria-haspopup="true"
            value={convertCase('MyProfile', 'camel')}
            onClick={onClick_CloseModal}
          >
            <IconX className={`${stylesModal['icon-x']}`} />
          </button>
        </div>

        <div className={`${stylesModal['division']}`} />

        <form className={`${stylesModal['content']}`} onSubmit={onSubmit}>
          {urlPhotoLocal && (
            <div className={`${styles['profile-photo']} ${stylesModal['content__section']}`}>
              <img src={urlPhotoLocal} />
            </div>
          )}

          {user?.email && ( // twitter 이용할 때 등 이메일이 없을 때가 있다
            <div className={`${stylesModal['content__section']} ${styles['email']}`}>
              <h3>
                <FormattedMessage id={`Modal.MyProfile_EmailAddress`} />
              </h3>
              <span className={`${styles['email']}`}> {user?.email} </span>
            </div>
          )}

          <div className={`${stylesModal['content__section']} ${styles['name']}`}>
            <h3>
              <FormattedMessage id={`Modal.MyProfile_Name`} />
            </h3>
            {isEditingName ? (
              <input
                type="text"
                name="editingName"
                value={editingName}
                required={true}
                onChange={onChange_EditingName}
              />
            ) : (
              <div className={`${styles['division']}`}>
                <span className={`${styles['current-name']}`}> {user?.name} </span>
              </div>
            )}

            <button
              className={`${styles['start-editing-name']} ${!isEditingName ? 'active' : ''}`}
              value="start-editing-name"
              type="button"
              onClick={() => setIsEditingName(true)}
            >
              <IconEdit className={`${styles['icon__edit']}`} kind="solid" />
            </button>

            <button
              className={`${styles['cancel-editing-name']}  ${isEditingName ? 'active' : ''}`}
              value="cancel-editing-name"
              type="button"
              onClick={() => setIsEditingName(false)}
            >
              <IconX className={`${styles['icon__x']}`} kind="regular" />
            </button>

          </div>

          <div className={`${stylesModal['content__section']} ${styles['photo']}`}>
            <h3>
              <FormattedMessage id={`Modal.MyProfile_Photo`} />{' '}
            </h3>

            <div className={`container__input-file`}>
              <input
                type="file"
                accept="image/*"
                id="file-photo"
                onChange={onChange_InputFile}
                onClick={onClick_InputFile}
              />
              <label htmlFor="file-photo"> Upload Photo </label>
              {urlPhotoLocal && <button onClick={onClick_ClearInputFile}> Clear </button>}
            </div>
          </div>

          {(urlPhotoLocal || ((editingName !== user?.name) && editingName !=='')) && (
            <div className={`${stylesModal['content__section']}`}>
              <input type="submit" value={intl.formatMessage({ id: 'Modal.MyProfile_Update' })} />
            </div>
          )}

          <div className={`${stylesModal['content__section']} ${styles['log-out']}`}>
            <button
              type="button"
              value="log-out"
              className={`${styles['button__log-out']}`}
              onClick={() => onClick_LogOut()}
            >
              <FormattedMessage id={`Modal.Setting_LogOut`} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

MyProfile.defaultProps = {};

export default MyProfile;

/*
{attachment && (
    <div>
        <img src={attachment} width="50px" height="50px" />
        <button onClick={onClick_ClearAttachment}>Clear</button>
    </div>
)}

*/
