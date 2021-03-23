import React, { useCallback, useEffect } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

import styles from './Footer.module.scss';

//import IconLogo from 'svgs/others/IconLogo';

type PropsFooter = {};

function Footer({}: PropsFooter) {

    const dispatch = useDispatch();
    const location = useLocation();
    
    const showingFooter = useSelector((state: StateRoot) => state['status']['showing']['footer']);
  
  
  return (
    <footer className={`${styles['root']} showing----${showingFooter}`}>
        <div> ⓒ 2016. nextwing.me All Rights Reserved. </div> 
    </footer>
  );
}

Footer.defaultProps = {};

export default Footer;
