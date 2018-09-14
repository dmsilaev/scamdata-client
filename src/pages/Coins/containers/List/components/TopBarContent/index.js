import React, { Component } from "react";

import TopBarSearchBox from "./TopBarSearchBox";
import TopBarActionBox from "./TopBarActionBox";

class TopBarContent extends Component {
  render() {
    return (
      <div className="layout__topbar-content">
        <div className="layout__topbar-content-wrapper">
          <TopBarSearchBox />
          <TopBarActionBox />
        </div>
      </div>
    );
  }
}

export default TopBarContent;
