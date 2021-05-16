import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import LogIn from './Auth/LogIn';
import SignUp from './Auth/SignUp';

import Opening from './Opening';

import Test from './Test';
import NotFound from './NotFound';

//import SignUp from "./components/Auth/SignUp";

import styles from './index.module.scss';
import Quiz from './Quiz';


function Main() {
  return (
    <main className={`${styles['root']}`}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/log-in">
          <LogIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>

        <Route path="/opening">
          <Opening />
        </Route>

        <Route path="/quiz">
          <Quiz />
        </Route>

        <Route path="/test">
          <Test />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
