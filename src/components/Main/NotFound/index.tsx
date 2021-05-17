import React, { useCallback, useEffect } from 'react';

import history from 'libraries/history';
import { useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { StateRoot } from 'store/reducers';

import useInput from 'tools/hooks/useInput';
import * as actions from 'store/actions';

import TopBar from '../Auth/common/TopBar';

import IconMapSigns from 'svgs/basic/IconMapSigns';

import styles from './index.module.scss';
import stylesLogIn from '../Auth/LogIn/index.module.scss';

function NotFound() {
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    dispatch(
      actions.appearance.return__REPLACE({
        keyList: ['showing', 'header', 'root'],
        replacement: false,
      }),
    );
  }, []);

  return (
    <div className={`${stylesLogIn['root']}`}>
      <TopBar />

      <div className={`${styles['content']}`}>
        <IconMapSigns className={`${styles['icon__map-signs']}`} kind="light" />
        <div> Not Found </div>
      </div>
    </div>
  );
}

NotFound.defaultProps = {};

export default NotFound;
