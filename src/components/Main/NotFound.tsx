import React, { useCallback, useEffect } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import useInput from 'tools/hooks/useInput';
import * as actions from "store/actions";

import TopBar from './LogIn/TopBar';

import IconMapSigns from 'svgs/basic/IconMapSigns';

import styles from './NotFound.module.scss';
import stylesLogIn from './LogIn.module.scss';

type PropsNotFound = {};

function NotFound({}: PropsNotFound) {
  
  const dispatch = useDispatch();
  const intl = useIntl();
  
  useEffect(() => {
    dispatch(actions.appearance.return__REPLACE({
        listKey:['showing', 'header', 'root'],
        replacement: false
    }));
  }, []);
  
  return (
    <div className={`${stylesLogIn['root']}`} >
        
        <TopBar />

        <div className={`${styles['content']}`} >  

          <IconMapSigns className={ `${styles['icon__map-signs']}`} kind='light' />
          <div> Not Found </div>

        </div>     
    </div>
  );
}

NotFound.defaultProps = {};

export default NotFound;
