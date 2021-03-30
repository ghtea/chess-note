import ChessBoard from 'components/Global/ChessBoard';
import React, { useCallback, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import ToolBar from './Quiz/ToolBar';


// import Football from "components/Main/Sports/Football";

// import styles from './Main.module.scss';


type PropsQuiz = {};

function Quiz({}: PropsQuiz) {

  const [pgn, setPgn] = useState('');

  const onClick_Button = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //const {currentTarget: {value}} = event;
        setPgn(`
          1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 Nc6 5. Nxc3 Bb4 6. Qb3 Bxc3+ 7. bxc3 Na5
          8. Bxf7+ Kf8 9. Qb4+ d6 10. Bxg8 Nc6 11. Qb3 Rxg8 12. Nf3 Qe7 13. e5 Nxe5 14.
          O-O Nxf3+ 15. gxf3 Be6 16. Qc2 g6 17. Ba3 Kf7 18. Rfe1 c5 19. Re3 Rge8 20. Rae1
          Qh4 21. Bb2 Bh3 22. Re4 1-0
          `
        )
    }, []
);


  return (
    <div>
      <ChessBoard pgn={pgn} setPgn={setPgn}/>
      <ToolBar />
    </div>
  );
}

export default Quiz;

