import React, {useCallback} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import Setting from "./Modal/Setting";
import MyProfile from "./Modal/MyProfile";

import SortingFootballLeagueStandings from "./Modal/Others/SortingFootballLeagueStandings";


// import styles from './Modal.module.scss';


type PropsModal = {};

function Modal({}: PropsModal) {
  
    const showingSetting = useSelector((state: StateRoot) => state.status.showing.modal.setting);
    const showingMyProfile = useSelector((state: StateRoot) => state.status.showing.modal.myProfile); 

    const showingSortingFootballLeagueStandings = useSelector((state: StateRoot) => state.status.showing.modal.sortingFootballLeagueStandings);  

    return (        
        <>
            {showingSetting && <Setting />}
            {showingMyProfile && <MyProfile />}

            {showingSortingFootballLeagueStandings && <SortingFootballLeagueStandings/>}
        </>
    );
}

export default Modal;

/*
<Route path="/sign-up" >
            <SignUp />
          </Route>
          <Route path="/log-in" >
            <LogIn />
          </Route>
*/

