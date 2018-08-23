import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import MenuBackIcon from "Icons/menu-back.svg";

@inject("store")
export default class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.menuStore;
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    this.store.toggle();
  }

  render() {
    return (
      <div className="layout-menu__header">
        <span>Crypto Analitics</span>

        <a href="" onClick={this.clickHandler}>
          <MenuBackIcon />
        </a>
      </div>
    );
  }
}
