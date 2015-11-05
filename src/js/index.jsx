import React from 'react';
import Router from './Router';

Router.run(function(Handler) {
  React.render(<Handler/>, document.getElementById('root'));
});
