import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from 'react-router';

import Root from './Views/Layouts/Root';
import Home from './Views/Layouts/Home';
import Login from './Views/Layouts/Login';

ReactDOM.render(
  <Router>
    <Route component={Root}>
      <Route name="home" path="/" component={Home}/>
      <Route name="login" path="/login" component={Login}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
