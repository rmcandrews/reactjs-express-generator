import React from "react";
import { render } from "react-dom";

import User from "../components/User.jsx";
import Menu from "../components/Menu.jsx";

class Home extends React.Component {
  render() {
    return (
      <div className="page">
        <Menu />
        <div className="users">
          <h1>Users Page</h1>
          <User />
        </div>
      </div>
    );
  }
}

export default Home;
