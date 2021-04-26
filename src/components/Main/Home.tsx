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
  //const statusUser = useSelector((state: StateRoot) => state.status.auth.user);
  
  const onClick_Link = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      
      const href = (event.currentTarget as HTMLAnchorElement).getAttribute("href");  // https://stackoverflow.com/questions/1550901/how-to-get-raw-href-contents-in-javascript
      console.log(href)
      if (href) {
        history.push(href);
      }

    },[]
  );

  return (

    <div className={`${styles['root']}`} >

      <div>
        <a 
            href={'/opening'}
            onClick={onClick_Link}
          > 
            <h2> <FormattedMessage id={'Global.Opening'} />  </h2>
            <p> <FormattedMessage id={'Main.Home_Opening_Introduction'} /> </p>
        </a>
      </div>

      <div>
        <a 
            href={'/quiz'}
            onClick={onClick_Link}
          > 
            <h2> <FormattedMessage id={'Global.Quiz'} />  </h2>
            <p> <FormattedMessage id={'Main.Home_Quiz_Introduction'} /> </p>
        </a>
      </div>

    </div>
  );
}

Home.defaultProps = {};

export default Home;

