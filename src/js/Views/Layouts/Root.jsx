import React from 'react';
import Header from '../Components/Header';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <div className="page p-v--double">
          {this.props.children}
        </div>
      </div>
    );
  }
}
