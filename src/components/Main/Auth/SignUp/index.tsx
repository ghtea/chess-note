import React, { useCallback, useEffect, useState } from 'react';

import history from 'libraries/history';
import { useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';

import useInputBasic from 'tools/hooks/useInputBasic';
import useLink from 'tools/hooks/useLink';

import InputEmail from 'components/common/Input/InputEmail';
import InputPassword from 'components/common/Input/InputPassword';

import TopBar from '../common/TopBar';

//import IconLogIn from 'svgs/basic/IconLogIn';
import imgGoogle from 'others/images/g-logo.png';
import IconGithub from 'svgs/others/IconGithub';

import styles from './index.module.scss';
import stylesLogIn from '../LogIn/index.module.scss';
import IconTwitter from 'svgs/others/IconTwitter';

function SignUp() {
  const dispatch = useDispatch();
  const intl = useIntl();

  const statusUser = useSelector((state: RootState) => state.status.auth.user);

  const otherSituationCodeList: string[] = useSelector(
    (state: RootState) => state['notification']['otherSituationCodeList'],
  );

  const { onClick_LinkInsideApp } = useLink(history);

  const { draft: draft_Main, onChange: onChange_Main } = useInputBasic({
    email: '',
    password1: '',
    password2: '',
  });

  const [situationCodeEmail, setCodeSituationEmail] = useState('');
  const [situationCodePassword, setCodeSituationPassword] = useState('');

  useEffect(() => {
    if (statusUser.ready) {
      history.push('/');
    }
  }, [statusUser.ready]);

  useEffect(() => {
    if (otherSituationCodeList.includes('SignUp_NoEmail__E')) {
      setCodeSituationEmail('SignUp_NoEmail__E');
      setCodeSituationPassword('');
    } else if (otherSituationCodeList.includes('SignUp_InvalidEmail__E')) {
      setCodeSituationEmail('SignUp_InvalidEmail__E');
      setCodeSituationPassword('');
    } else if (otherSituationCodeList.includes('SignUp_DuplicateEmail__E')) {
      setCodeSituationEmail('SignUp_DuplicateEmail__E');
      setCodeSituationPassword('');
    } else if (otherSituationCodeList.includes('LogIn_NoPassword__E')) {
      setCodeSituationEmail('');
      setCodeSituationPassword('LogIn_NoPassword__E');
    } else if (otherSituationCodeList.includes('SignUp_PasswordsDifferent__E')) {
      setCodeSituationEmail('');
      setCodeSituationPassword('SignUp_PasswordsDifferent__E');
    } else if (otherSituationCodeList.includes('SignUp_WeakPassword__E')) {
      setCodeSituationEmail('');
      setCodeSituationPassword('SignUp_WeakPassword__E');
    } else {
      setCodeSituationEmail('');
      setCodeSituationPassword('');
    }
  }, [otherSituationCodeList]);

  const submitMain = useCallback(() => {
    dispatch(
      actions.auth.return__SIGN_UP({
        email: draft_Main.email,
        password1: draft_Main.password1,
        password2: draft_Main.password2,
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
        dispatch(actions.auth.return__CONTINUE_WITH_GITHUB());
      } else if (value === 'github') {
        dispatch(actions.auth.return__CONTINUE_WITH_TWITTER());
      }
    },
    [],
  );

  return (
    <div className={`${stylesLogIn['root']}`}>
      <TopBar />

      <form className={`${stylesLogIn['content']}`} onSubmit={onSubmit_Main}>
        <div className={`${stylesLogIn['title-page']}`}>
          <FormattedMessage id={`Main.SignUp_SignUp`} />
        </div>

        <div className={`${stylesLogIn['input-identity']}`}>
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
            {situationCodeEmail && (
              <FormattedMessage id={`Notification.${situationCodeEmail}`} />
            )}{' '}
          </div>
        </div>

        <div className={`${stylesLogIn['input-password']}`}>
          <InputPassword
            name="password1"
            value={draft_Main.password1}
            label={intl.formatMessage({ id: 'Main.LogIn_Password' })}
            placeholder={intl.formatMessage({ id: 'Main.LogIn_Password' })}
            required={true}
            onChange={onChange_Main}
            onKeyPress={onKeyPress_Main}
          />
          <div>
            {' '}
            {situationCodePassword && (
              <FormattedMessage id={`Notification.${situationCodePassword}`} />
            )}{' '}
          </div>
        </div>

        <div className={`${stylesLogIn['input-password']}`}>
          <InputPassword
            name="password2"
            value={draft_Main.password2}
            label={intl.formatMessage({ id: 'Main.SignUp_PasswordAgain' })}
            placeholder={intl.formatMessage({ id: 'Main.SignUp_PasswordAgain' })}
            required={true}
            onChange={onChange_Main}
            onKeyPress={onKeyPress_Main}
          />
        </div>

        <div className={`${stylesLogIn['button-enter']}`}>
          <input type="submit" value={intl.formatMessage({ id: 'Main.SignUp_SignUp' })} />
        </div>

        <div className={`${stylesLogIn['division']}`}>
          <div />
          <div> OR </div>
          <div />
        </div>

        <div className={`${stylesLogIn['collection-social']}`}>
          <button type="button" value="google" onClick={onClick_LogInSocial}>
            <span className={`${stylesLogIn['icon']}`}>
              <img src={imgGoogle} />
            </span>
            <span className={`${styles['text']}`}>
              {' '}
              <FormattedMessage id={`Main.LogIn_ContinueWithGoogle`} />{' '}
            </span>
          </button>

          <button type="button" value="twitter" onClick={onClick_LogInSocial}>
            <span className={`${stylesLogIn['icon']}`}>
              {' '}
              <IconTwitter className={`icon__twitter`} />
            </span>
            <span className={`${styles['text']}`}>
              {' '}
              <FormattedMessage id={`Main.LogIn_ContinueWithTwitter`} />{' '}
            </span>
          </button>

          <button type="button" value="github" onClick={onClick_LogInSocial}>
            <span className={`${stylesLogIn['icon']}`}>
              {' '}
              <IconGithub className={`icon__github`} />
            </span>
            <span className={`${styles['text']}`}>
              {' '}
              <FormattedMessage id={`Main.LogIn_ContinueWithGithub`} />{' '}
            </span>
          </button>
        </div>

        <nav className={`${stylesLogIn['collection-link']}`}>
          <div>
            <a href="/" onClick={onClick_LinkInsideApp}>
              {' '}
              <FormattedMessage id={`Nav.Home`} />{' '}
            </a>
          </div>
          <div>
            <a href="/log-in" onClick={onClick_LinkInsideApp}>
              {' '}
              <FormattedMessage id={'Nav.LogIn'} />{' '}
            </a>
          </div>
        </nav>
      </form>
    </div>
  );
}

SignUp.defaultProps = {};

export default SignUp;
