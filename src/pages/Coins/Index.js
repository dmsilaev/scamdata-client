import React, { Component } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import List from "./containers/List";

@withRouter
@observer
class Coins extends Component {
  render() {
    return <List />
  }
}

export default Coins;
