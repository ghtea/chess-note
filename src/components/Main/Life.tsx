import React from 'react';
import { Route, Switch } from "react-router-dom";


import Weather from "components/Main/Life/Weather";

// import styles from './Main.module.scss';


type PropsLife = {};

function Life({}: PropsLife) {
  return (
          <Switch>
            
            <Route path="/life/weather" >
                <Weather />
            </Route>


          </Switch>
  );
}

export default Life;

