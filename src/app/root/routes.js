import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/home';
import Floor from '../components/floor';
import MustSee from '../components/must-see';
import Waiting from '../components/waiting';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Waiting} />
    <Route path="/waiting" component={Waiting} />
    <Route path="/home/:modal/:animate" component={Home} />
    <Route path="/floor/:floor/:section/:animate" component={Floor} />
    <Route path="/must-see" component={MustSee} />
  </Switch>
);

export default Routes;
