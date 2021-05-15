import React, { useCallback } from "react";

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import {Banner as TypeBanner} from 'store/reducers/notification';

import Banner from "./Notification/Banner";

import styles from './Notification.module.scss';



function Notification() {
  
  // const dispatch = useDispatch();
  
  const listBanner:TypeBanner[] = useSelector((state: StateRoot) => state.notification.listBanner);

  return (
    
    <div className={`${styles['root']}`} >
        {listBanner.map( (banner, iBanner)=> 
            <Banner
                banner={banner}
                key={`banner-${iBanner}`}
            />
        )}
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

