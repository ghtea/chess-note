import React, {useCallback, useMemo} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import Setting from "./Modal/Setting";
import MyProfile from "./Modal/MyProfile";

import QuizEditingUpload from './Modal/Quiz/QuizEditingUpload';
import QuizEditingSet from "./Modal/Quiz/QuizEditingSet";
import QuizEditingOthers from "./Modal/Quiz/QuizEditingOthers";

// import styles from './Modal.module.scss';


type PropsModal = {};

function Modal({}: PropsModal) {
  
    const showing = useSelector((state: StateRoot) => state.appearance.showing.modal);
    
    const topChessBoard = useSelector((state: StateRoot) => state.appearance.layout.document.chessBoard.top);
    const lengthChessBoard = useSelector((state: StateRoot) => state.appearance.layout.document.chessBoard.length);
    
    const topModalQuiz = useMemo(()=>{
      // 우선 위끝을 체스판 아래끝에 맞추고, 나중에 css 에서 modal 크기 고려해서 위로 좀더 이동시킨다
      return (topChessBoard + 1 * lengthChessBoard)
    },[topChessBoard, lengthChessBoard]);

    return (        
        <>
            {showing.setting && <Setting />}
            {showing.myProfile && <MyProfile />}

            {showing.quizEditingUpload && <QuizEditingUpload top={topModalQuiz}/>}
            {showing.quizEditingSet && <QuizEditingSet top={topModalQuiz}/>}
            {showing.quizEditingOthers && <QuizEditingOthers top={topModalQuiz}/>}

            {showing.quizTryingOthers && <QuizEditingSet top={topModalQuiz}/>}
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

