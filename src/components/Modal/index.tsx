import React, { useCallback, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/reducers';

import Setting from './Setting';
import MyProfile from './MyProfile';

import QuizHomeOthers from './Quiz/QuizHome/Others';
import QuizEditingUpload from './Quiz/QuizEditing/Upload';
import QuizEditingSet from './Quiz/QuizEditing/Set';
import QuizEditingManageAnswersMarks from './Quiz/common/ManageAnswersMarks';
import QuizEditingOthers from './Quiz/QuizEditing/Others';
import QuizPlayingOthers from './Quiz/QuizPlaying/Others';

// import styles from './Modal.module.scss';

function Modal() {
  const showing = useSelector((state: RootState) => state.appearance.showing.modal);

  const topChessBoard = useSelector(
    (state: RootState) => state.appearance.layout.document.chessBoard.top,
  );
  const chessBoardLength = useSelector(
    (state: RootState) => state.appearance.layout.document.chessBoard.length,
  );

  const topModalQuiz = useMemo(() => {
    // 우선 위끝을 체스판 아래끝에 맞추고, 나중에 css 에서 modal 크기 고려해서 위로 좀더 이동시킨다
    return topChessBoard + 1 * chessBoardLength;
  }, [topChessBoard, chessBoardLength]);

  return (
    <>
      {showing.setting && <Setting />}
      {showing.myProfile && <MyProfile />}

      {showing.quizHomeOthers && <QuizHomeOthers />}

      {showing.quizEditingUpload && <QuizEditingUpload top={topModalQuiz} />}
      {showing.quizEditingSet && <QuizEditingSet top={topModalQuiz} />}
      {showing.quizEditingOthers && <QuizEditingOthers top={topModalQuiz} />}

      {showing.quizPlayingOthers && <QuizPlayingOthers top={topModalQuiz} />}

      {showing.quizManageAnswers && (
        <QuizEditingManageAnswersMarks top={topModalQuiz} kind="answer" />
      )}
      {showing.quizManageMarks && <QuizEditingManageAnswersMarks top={topModalQuiz} kind="mark" />}

      {showing.quizTryingOthers && <QuizEditingSet top={topModalQuiz} />}
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
