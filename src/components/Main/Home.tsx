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
    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);

    const idUser = useSelector((state: StateRoot) => state.auth.user?.id);


  return (

    <div className={`${styles['root']}`} >


    </div>
  );
}

Home.defaultProps = {};

export default Home;

