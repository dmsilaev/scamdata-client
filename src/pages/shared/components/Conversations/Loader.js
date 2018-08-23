import React, { Component } from "react";
import { autorun } from "mobx";
import { observer, inject } from "mobx-react";
import { computed } from "mobx";

import { List } from 'react-content-loader'

@observer
class Loader extends Component {
  render() {
    return (
      <div className="messages">
        <div className="msg to">
          <List />
        </div>
        <div className="msg from">
          <List />
        </div>
        <div className="msg to">
          <List />
        </div>
        <div className="msg from">
          <List />
        </div>
      </div>
    );
  }
}

export default Loader;
