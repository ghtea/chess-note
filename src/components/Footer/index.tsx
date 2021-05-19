import React, { useCallback, useEffect } from 'react';
import history from 'libraries/history';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';
import * as actions from 'store/actions';

import styles from './index.module.scss';

//import IconLogo from 'svgs/others/IconLogo';

function Footer() {
  const dispatch = useDispatch();
  const location = useLocation();

  const showingFooter = useSelector((state: RootState) => state.appearance.showing.footer);

  return (
    <footer className={`${styles['root']} showing----${showingFooter}`}>
      <div> ⓒ 2016. nextwing.me All Rights Reserved. </div>
    </footer>
  );
}

Footer.defaultProps = {};

export default Footer;
