import React, { useCallback, useEffect, useState } from "react";
import history from 'historyApp';

import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actionsRoot from "store/actions";


import IconSpinner from 'svgs/basic/IconSpinner';


import styles from './Loading.module.scss';



type PropsLoading = {};

function Loading({}:PropsLoading) {
  
    const dispatch = useDispatch();
    const intl = useIntl();
  
    //const statusUser = useSelector((state: StateRoot) => state.status.auth.user);


  return (
    <div className={`${styles['root']}`} >
        <IconSpinner className={`${styles['icon__spinner']}`}/>
    </div>
  );
} 

Loading.defaultProps = {};

export default Loading;

