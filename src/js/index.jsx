import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

Router.run(function(Handler) {
  ReactDOM.render(<Handler/>, document.getElementById('root'));
});
