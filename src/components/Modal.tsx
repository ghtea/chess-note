import React, {useCallback} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import Setting from "./Modal/Setting";
import MyProfile from "./Modal/MyProfile";

import QuizSave from "./Modal/Quiz/QuizSave";
import QuizPut from './Modal/Quiz/QuizPut';


// import styles from './Modal.module.scss';


type PropsModal = {};

function Modal({}: PropsModal) {
  
    const showingSetting = useSelector((state: StateRoot) => state.status.showing.modal.setting);
    const showingMyProfile = useSelector((state: StateRoot) => state.status.showing.modal.myProfile); 

    const showingQuizSave = useSelector((state: StateRoot) => state.status.showing.modal.quizSave);  
    const showingQuizPut = useSelector((state: StateRoot) => state.status.showing.modal.quizPut);  

    return (        
        <>
            {showingSetting && <Setting />}
            {showingMyProfile && <MyProfile />}

            {showingQuizSave && <QuizSave />}
            {showingQuizPut && <QuizPut />}
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

