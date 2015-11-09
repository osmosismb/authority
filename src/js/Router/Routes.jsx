import React from 'react';
import { DefaultRoute, Route } from 'react-router';

import Root, { Home, Login } from '../Views/Layouts';

export default (
  <Route name="root" path="/" handler={Root}>
    <Route name="login" path="/login" handler={Login}/>
    <DefaultRoute handler={Home}/>
  </Route>
);
