import React from 'react';
import {render} from 'react-dom';

import User from './components/User.jsx';

class App extends React.Component {
  render () {
    return (
      <div className="home">
        <User />
        <p>Welcome to the ReactJS and ExpressJS generator</p>
        <p>Check out the <a href="/docs">documentation</a> to get started.</p>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
