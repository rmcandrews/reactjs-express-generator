import React from 'react';
import {render} from 'react-dom';

import User from '../components/User.jsx';

class Home extends React.Component {
  render () {
    return (
      <div className="home">
        <User />
        <p>Welcome to the ReactJS and ExpressJS generator</p>
        <p>Check out the <a href="https://github.com/kevin-wynn/reactjs-express-generator/wiki">documentation</a> to get started.</p>
      </div>
    );
  }
}

export default Home;
