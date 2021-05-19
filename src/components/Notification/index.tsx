import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';

import { Banner as TypeBanner } from 'store/reducers/notification';

import Banner from './Banner';

import styles from './index.module.scss';

function Notification() {
  // const dispatch = useDispatch();

  const bannerList: TypeBanner[] = useSelector((state: RootState) => state.notification.bannerList);

  return (
    <div className={`${styles['root']}`}>
      {bannerList.map((banner, iBanner) => (
        <Banner banner={banner} key={`banner-${iBanner}`} />
      ))}
    </div>
  );
}

export default Notification;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/
