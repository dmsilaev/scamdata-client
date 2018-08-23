import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import MenuBurgerIcon from "Icons/menu-burger.svg";

@inject("store")
@observer
export default class TopBarControl extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.menuStore;
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault()
    this.store.toggle();
  }

  render() {
    const { openned } = this.store;
    if (openned) return null;

    return (
      <div className="layout__topbar-control">
        <a href="" onClick={this.clickHandler}>
          <MenuBurgerIcon />
        </a>
      </div>
    )
  }
}
