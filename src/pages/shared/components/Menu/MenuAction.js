import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class MenuAction extends Component {
  constructor(props) {
    super(props);
    // this.logout = this.logout.bind(this);
  }
  //
  // logout() {
  //   const { userStore } = this.props.store;
  //   userStore.logout()
  // }

  render() {
    const { userStore } = this.props.store;

    return (
      <div className="layout__menu-action">
        <div className="content">
          <div className="item">
            <a href="/docs" target="_blank">
              User tutorial
            </a>
          </div>
          {/*<div className="item">*/}
            {/*<span>{userStore.email}</span>*/}
          {/*</div>*/}
          <div className="item">
            <button className="button dark" onClick={this.logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
