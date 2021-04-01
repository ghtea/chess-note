import React, {useCallback} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import Setting from "./Modal/Setting";
import MyProfile from "./Modal/MyProfile";

import QuizSave from "./Modal/Quiz/QuizSave";


// import styles from './Modal.module.scss';


type PropsModal = {};

function Modal({}: PropsModal) {
  
    const showingSetting = useSelector((state: StateRoot) => state.status.showing.modal.setting);
    const showingMyProfile = useSelector((state: StateRoot) => state.status.showing.modal.myProfile); 

    const showingQuizSave = useSelector((state: StateRoot) => state.status.showing.modal.quizSave);  

    return (        
        <>
            {showingSetting && <Setting />}
            {showingMyProfile && <MyProfile />}

            {showingQuizSave && <QuizSave />}
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

