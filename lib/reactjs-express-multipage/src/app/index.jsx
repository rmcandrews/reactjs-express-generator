import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './../scss/main.scss';

import Home from './pages/Home.jsx';

render((
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
    </Switch>
  </Router>
  ),
  document.getElementById('app')
);
