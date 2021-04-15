import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import Loading from 'components/Global/Loading';

//import actionsRoot from 'store/actions';

//import Portal from './Home/Portal';

import styles from './Home.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsHome = {};

function Home({}: PropsHome) {
  
  const dispatch = useDispatch();     
  const statusUser = useSelector((state: StateRoot) => state.status.auth.user);
    

  return (

    <div className={`${styles['root']}`} >


    </div>
  );
}

Home.defaultProps = {};

export default Home;

