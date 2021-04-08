import React, {useCallback} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import Setting from "./Modal/Setting";
import MyProfile from "./Modal/MyProfile";

import QuizEditingUpload from './Modal/Quiz/QuizEditingUpload';
import QuizEditingSave from "./Modal/Quiz/QuizEditingSave";
import QuizEditingOthers from "./Modal/Quiz/QuizEditingOthers";

// import styles from './Modal.module.scss';


type PropsModal = {};

function Modal({}: PropsModal) {
  
    const showing = useSelector((state: StateRoot) => state.status.showing.modal);
    
    return (        
        <>
            {showing.setting && <Setting />}
            {showing.myProfile && <MyProfile />}

            {showing.quizEditingUpload && <QuizEditingUpload />}
            {showing.quizEditingSave && <QuizEditingSave />}
            {showing.quizEditingOthers && <QuizEditingOthers />}

            {showing.quizTryingOthers && <QuizEditingSave />}
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

