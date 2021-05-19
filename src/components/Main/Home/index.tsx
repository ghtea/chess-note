import React, { useCallback, useEffect, useMemo } from 'react';
import history from 'libraries/history';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';

import Loading from 'components/Global/Loading';

//import actions from 'store/actions';

//import Portal from './Home/Portal';

import styles from './index.module.scss';

function Home() {
  const dispatch = useDispatch();
  //const statusUser = useSelector((state: RootState) => state.status.auth.user);

  const onClick_Link = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const href = (event.currentTarget as HTMLAnchorElement).getAttribute('href'); // https://stackoverflow.com/questions/1550901/how-to-get-raw-href-contents-in-javascript
    console.log(href);
    if (href) {
      history.push(href);
    }
  }, []);

  return (
    <div className={`${styles['root']}`}>
      <article>
        <a href={'/opening'} onClick={onClick_Link}>
          <h2>
            <FormattedMessage id={'Global.Opening'} />
          </h2>
          <p>
            <FormattedMessage id={'Main.Home_Opening_Introduction'} />
          </p>
        </a>
      </article>

      <article>
        <a href={'/quiz'} onClick={onClick_Link}>
          <h2>
            <FormattedMessage id={'Global.Quiz'} />
          </h2>
          <p>
            <FormattedMessage id={'Main.Home_Quiz_Introduction'} />
          </p>
        </a>
      </article>
    </div>
  );
}

Home.defaultProps = {};

export default Home;
