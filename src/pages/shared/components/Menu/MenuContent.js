import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import InfinityMenu from "../InfinityMenu";

import { tree } from "./tree";

export default class MenuContent extends Component {
  constructor(props) {
    super(props);
     this.onNodeMouseClick = this.onNodeMouseClick.bind(this);
  }
  componentWillMount() {
    this.setState({ tree: tree });
  }

  onNodeMouseClick(event, tree) {
    this.setState({tree: tree});
  }

  render() {
    return (
      <div className="layout__menu-content">
        <InfinityMenu
          tree={this.state.tree}
          disableDefaultHeaderContent={true}
          onNodeMouseClick={this.onNodeMouseClick}
        />
      </div>
    );
  }
}
