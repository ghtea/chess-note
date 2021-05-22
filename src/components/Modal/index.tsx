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

  const { x: chessBoardx, y: chessBoardy } = useSelector(
    (state: RootState) => state.appearance.layout.document.entireBoard.chessBoard.position,
  );
  const chessBoardLength = useSelector(
    (state: RootState) => state.appearance.layout.document.entireBoard.chessBoard.length,
  );

  const quizModalPositionStyle: React.CSSProperties = useMemo(() => {
    return {
      position: 'absolute',
      top: chessBoardy + chessBoardLength - 10,
      left: chessBoardx + chessBoardLength * 0.5,
      transform: 'translateX(-50%) translateY(-100%)',
    };
  }, [chessBoardx, chessBoardy, chessBoardLength]);

  return (
    <>
      {showing.setting && <Setting />}
      {showing.myProfile && <MyProfile />}

      {showing.quizHomeOthers && <QuizHomeOthers />}

      {showing.quizEditingUpload && (
        <QuizEditingUpload quizModalPositionStyle={quizModalPositionStyle} />
      )}
      {showing.quizEditingSet && <QuizEditingSet quizModalPositionStyle={quizModalPositionStyle} />}
      {showing.quizEditingOthers && (
        <QuizEditingOthers quizModalPositionStyle={quizModalPositionStyle} />
      )}
      {showing.quizPlayingOthers && (
        <QuizPlayingOthers quizModalPositionStyle={quizModalPositionStyle} />
      )}

      {showing.quizManageAnswers && (
        <QuizEditingManageAnswersMarks
          quizModalPositionStyle={quizModalPositionStyle}
          kind="answer"
        />
      )}
      {showing.quizManageMarks && (
        <QuizEditingManageAnswersMarks
          quizModalPositionStyle={quizModalPositionStyle}
          kind="mark"
        />
      )}
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
