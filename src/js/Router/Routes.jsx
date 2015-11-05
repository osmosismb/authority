import React from 'react';
import { DefaultRoute, Route } from 'react-router';

import Root, { App } from '../Views/Layouts';

export default (
  <Route name="root" path="/" handler={Root}>
    <DefaultRoute handler={App}/>
  </Route>
);
