import React from 'react';
import { Route, Switch } from "react-router-dom";


import Football from "components/Main/Sports/Football";

// import styles from './Main.module.scss';


type PropsSports = {};

function Sports({}: PropsSports) {
  return (
          <Switch>
            
            <Route path="/sports/football" >
                <Football />
            </Route>


          </Switch>
  );
}

export default Sports;

