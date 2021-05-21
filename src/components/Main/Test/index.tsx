import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';

import * as actions from 'store/actions';

import styles from './index.module.scss';

function Test() {
  const dispatch = useDispatch();

  const onClick_AddBanner = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { value: situationCode } = event.currentTarget;

      dispatch(
        actions.notification.return__ADD_DELETE_BANNER({
          situationCode: situationCode,
        }),
      );
    },
    [],
  );

  return (
    <div className={`${styles['root']}`}>
      <div className={`${styles['content']}`}>
        <button type="button" value="Test1__S" onClick={onClick_AddBanner}>
          {' '}
          Test 1
        </button>

        <button type="button" value="Test2__H" onClick={onClick_AddBanner}>
          {' '}
          Test 2
        </button>
      </div>
    </div>
  );
}

Test.defaultProps = {};

export default Test;
