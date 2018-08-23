import React, { Component } from "react";

import Control from "./TopBarControl";

export default class TopBar extends Component {
  render() {
    const Content = this.props.content;

    return (
      <div className="layout__topbar">
        <Control />
        <Content />
      </div>
    );
  }
}
