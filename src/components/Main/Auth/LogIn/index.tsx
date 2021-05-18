import React, { useCallback, useEffect, useState } from 'react';
import history from 'libraries/history';
import { FormattedMessage, useIntl } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { StateRoot } from 'store/reducers';

import * as actions from 'store/actions';

import useInputBasic from 'tools/hooks/useInputBasic';
import useLink from 'tools/hooks/useLink';

import InputEmail from 'components/Global/Input/InputEmail';
import InputPassword from 'components/Global/Input/InputPassword';

//import IconLogIn from 'svgs/basic/IconLogIn';
import imgGoogle from 'others/images/g-logo.png';
import IconGithub from 'svgs/others/IconGithub';
import IconTwitter from 'svgs/others/IconTwitter';

import TopBar from '../common/TopBar';
import styles from './index.module.scss';

function LogIn() {
  const dispatch = useDispatch();
  const intl = useIntl();

  const statusUser = useSelector((state: StateRoot) => state.status.auth.user);

  // when login button is pushed, notification code of reaction is added to  this list, when login button is pushed again this list cleared once
  const otherSituationCodeList = useSelector(
    (state: StateRoot) => state['notification']['otherSituationCodeList'],
  );

  const { onClick_LinkInsideApp } = useLink(history);

  const { draft: draft_Main, onChange: onChange_Main } = useInputBasic({
    email: '',
    password: '',
  });

  const [codeSituationEmail, setCodeSituationEmail] = useState('');
  const [codeSituationPassword, setCodeSituationPassword] = useState('');

  useEffect(() => {
    if (statusUser.ready) {
      history.push('/');
    }
  }, [statusUser.ready]);

  useEffect(() => {
    if (otherSituationCodeList.includes('LogIn_NoEmail__E')) {
      setCodeSituationEmail('LogIn_NoEmail__E');
      setCodeSituationPassword('');
    } else if (otherSituationCodeList.includes('LogIn_InvalidEmail__E')) {
      setCodeSituationEmail('LogIn_InvalidEmail__E');
      setCodeSituationPassword('');
    } else if (otherSituationCodeList.includes('LogIn_NoPassword__E')) {
      setCodeSituationEmail('');
      setCodeSituationPassword('LogIn_NoPassword__E');
    } else if (otherSituationCodeList.includes('LogIn_WrongPassword__E')) {
      setCodeSituationEmail('');
      setCodeSituationPassword('LogIn_WrongPassword__E');
    } else {
      setCodeSituationEmail('');
      setCodeSituationPassword('');
    }
  }, [otherSituationCodeList]);

  const submitMain = useCallback(() => {
    dispatch(
      actions.auth.return__LOG_IN({
        email: draft_Main.email,
        password: draft_Main.password,
      }),
    );
  }, [draft_Main]);
  const onSubmit_Main = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitMain();
    },
    [draft_Main],
  );
  const onKeyPress_Main = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        submitMain();
      }
    },
    [draft_Main],
  );

  const onClick_LogInSocial = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const {
        currentTarget: { value },
      } = event;
      if (value === 'google') {
        dispatch(actions.auth.return__CONTINUE_WITH_GOOGLE());
      } else if (value === 'twitter') {
        dispatch(actions.auth.return__CONTINUE_WITH_TWITTER());
      } else if (value === 'github') {
        dispatch(actions.auth.return__CONTINUE_WITH_GITHUB());
      }
    },
    [],
  );

  return (
    <div className={`${styles['root']}`}>
      <TopBar />

      <form className={`${styles['content']}`} onSubmit={onSubmit_Main}>
        <div className={`${styles['title-page']}`}>
          <FormattedMessage id={`Main.LogIn_LogIn`} />
        </div>

        <div className={`${styles['input-identity']}`}>
          <InputEmail
            name="email"
            value={draft_Main.email}
            label={intl.formatMessage({ id: 'Main.LogIn_EmailAddress' })}
            placeholder={intl.formatMessage({ id: 'Main.LogIn_EmailAddress' })}
            required={true}
            onChange={onChange_Main}
            onKeyPress={onKeyPress_Main}
          />
          <div>
            {' '}
            {codeSituationEmail && (
              <FormattedMessage id={`Notification.${codeSituationEmail}`} />
            )}{' '}
          </div>
        </div>

        <div className={`${styles['input-password']}`}>
          <InputPassword
            name="password"
            value={draft_Main.password}
            label={intl.formatMessage({ id: 'Main.LogIn_Password' })}
            placeholder={intl.formatMessage({ id: 'Main.LogIn_Password' })}
            required={true}
            onChange={onChange_Main}
            onKeyPress={onKeyPress_Main}
          />
          <div>
            {' '}
            {codeSituationPassword && (
              <FormattedMessage id={`Notification.${codeSituationPassword}`} />
            )}{' '}
          </div>
        </div>

        <div className={`${styles['button-enter']}`}>
          <input type="submit" value={intl.formatMessage({ id: 'Main.LogIn_LogIn' })} />
        </div>

        <div className={`${styles['division']}`}>
          <div />
          <div> OR </div>
          <div />
        </div>

        <div className={`${styles['collection-social']}`}>
          <button type="button" value="google" onClick={onClick_LogInSocial}>
            <span className={`${styles['icon']}`}>
              <img src={imgGoogle} />
            </span>
            <span className={`${styles['text']}`}>
              {' '}
              <FormattedMessage id={`Main.LogIn_ContinueWithGoogle`} />{' '}
            </span>
          </button>

          <button type="button" value="twitter" onClick={onClick_LogInSocial}>
            <span className={`${styles['icon']}`}>
              {' '}
              <IconTwitter className={`icon__twitter`} />
            </span>
            <span className={`${styles['text']}`}>
              {' '}
              <FormattedMessage id={`Main.LogIn_ContinueWithTwitter`} />{' '}
            </span>
          </button>

          <button type="button" value="github" onClick={onClick_LogInSocial}>
            <span className={`${styles['icon']}`}>
              {' '}
              <IconGithub className={`icon__github`} />
            </span>
            <span className={`${styles['text']}`}>
              {' '}
              <FormattedMessage id={`Main.LogIn_ContinueWithGithub`} />{' '}
            </span>
          </button>
        </div>

        <nav className={`${styles['collection-link']}`}>
          <div>
            <a href="/" onClick={onClick_LinkInsideApp}>
              {' '}
              <FormattedMessage id={`Nav.Home`} />{' '}
            </a>
          </div>
          <div>
            <a href="/sign-up" onClick={onClick_LinkInsideApp}>
              {' '}
              <FormattedMessage id={`Nav.SignUp`} />{' '}
            </a>
          </div>
        </nav>
      </form>
    </div>
  );
}

LogIn.defaultProps = {};

export default LogIn;
