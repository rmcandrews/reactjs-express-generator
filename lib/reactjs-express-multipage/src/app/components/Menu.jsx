import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="navigation">
        <div className="menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/users">Users</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default User;
