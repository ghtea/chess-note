import ChessBoard from 'components/Global/ChessBoard';
import React from 'react';
import { Route, Switch } from "react-router-dom";


// import Football from "components/Main/Sports/Football";

// import styles from './Main.module.scss';


type PropsOpening = {};

function Opening({}: PropsOpening) {
  return (
    <div>
      <ChessBoard />
    </div>
  );
}

export default Opening;

