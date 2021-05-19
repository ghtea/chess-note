import React, { useCallback, useEffect, useState } from 'react';
import history from 'libraries/history';

import { FormattedMessage, useIntl } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';

import * as actions from 'store/actions';

import IconSpinner from 'svgs/basic/IconSpinner';

import styles from './index.module.scss';

function Loading() {
  const dispatch = useDispatch();
  const intl = useIntl();

  //const statusUser = useSelector((state: RootState) => state.status.auth.user);

  return (
    <div className={`${styles['root']}`}>
      <IconSpinner className={`${styles['icon__spinner']}`} />
    </div>
  );
}

Loading.defaultProps = {};

export default Loading;
