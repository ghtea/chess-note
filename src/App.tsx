import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { firebaseAuth } from 'libraries/firebase';

import { IntlProvider } from 'react-intl';
import translationEn from 'language/translation/en.json';
import translationKo from 'language/translation/ko.json';

import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';
import 'styles/once.scss';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';

import Modal from 'components/Modal';
import Notification from 'components/Notification';
// import Action from "components/Action";

// TS  https://velog.io/@velopert/create-typescript-react-component
//type PropsApp = {};

function App() {
  const dispatch = useDispatch();
  //console.log('REACT_APP_NODE_ENV', process.env.NODE_ENV)

  // Language
  const codeLanguageCurrent: string = useSelector((state: RootState) => state.appearance.language);
  const translationLanguageCurrent = useMemo(() => {
    if (codeLanguageCurrent === 'ko') {
      return translationKo;
    } else {
      return translationEn;
    }
  }, [codeLanguageCurrent]);
  useEffect(() => {
    if (codeLanguageCurrent === '') {
      dispatch(actions.status.return__DETECT_LANGUAGE());
    } else {
      Cookies.set('codeLanguageStandard', codeLanguageCurrent, { expires: 30 });
    }
  }, [codeLanguageCurrent]);

  // theme
  const optionThemeCurrent: string = useSelector(
    (state: RootState) => state.appearance.theme.option,
  );
  const nameThemeCurrent: string = useSelector((state: RootState) => state.appearance.theme.name);
  useEffect(() => {
    dispatch(actions.status.return__READ_OPTION_THEME());
  }, [optionThemeCurrent]);
  useEffect(() => {
    if (nameThemeCurrent === 'dark') {
      document.body.classList.add('theme----dark');
      document.body.classList.remove('theme----light');
    } else {
      document.body.classList.add('theme----light');
      document.body.classList.remove('theme----dark');
    }
  }, [nameThemeCurrent]);

  // log check
  useEffect(() => {
    dispatch(
      actions.status.return__REPLACE({
        keyList: ['auth', 'user'],
        replacement: {
          tried: false,
          loading: true,
          ready: false,
        },
      }),
    );

    try {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(actions.auth.return__LOG_CHECK_SUCCEEDED());
        } else {
          dispatch(actions.auth.return__LOG_CHECK_FAILED());
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    dispatch(actions.auth.return__WATCH_USER_LOG_IN_OUT());
    dispatch(actions.auth.return__WATCH_MEMBER_CHANGE());
  }, []);

  useEffect(() => {
    dispatch(
      actions.appearance.return__REPLACE({
        keyList: ['layout', 'window', 'width'],
        replacement: document.documentElement.clientWidth,
      }),
    );
    dispatch(
      actions.appearance.return__REPLACE({
        keyList: ['layout', 'window', 'height'],
        replacement: document.documentElement.clientHeight,
      }),
    );

    window.addEventListener('resize', (event) => {
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['layout', 'window', 'width'],
          replacement: document.documentElement.clientWidth,
        }),
      );
      dispatch(
        actions.appearance.return__REPLACE({
          keyList: ['layout', 'window', 'height'],
          replacement: document.documentElement.clientHeight,
        }),
      );
    });
  }, []);

  // https://dev.to/cmcwebcode40/simple-react-dark-mode-with-scss-lae
  return (
    <>
      <IntlProvider locale={codeLanguageCurrent || 'en'} messages={translationLanguageCurrent}>
        <Notification />
        <Modal />
        {/*<Action/>*/}

        <Header />

        <Main />
        <Footer />
      </IntlProvider>
    </>
  );
}

export default App;
