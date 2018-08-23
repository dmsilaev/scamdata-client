import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import classNames from 'classnames';

import MenuHeader from "./MenuHeader";
import MenuContent from "./MenuContent";
import MenuAction from "./MenuAction";

@withRouter
@inject("store")
@observer
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.menuStore;
  }

  render() {
    return (
      <div className="layout__menu">
        <div className="layout__menu-wrapper">
          <MenuHeader />
          <MenuContent />
          <MenuAction />
        </div>
      </div>
    );
  }
}
