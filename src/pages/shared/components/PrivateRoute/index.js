import React, { Component } from "react";
import { computed } from "mobx";
import { inject, observer } from "mobx-react";
import { Route, Redirect, withRouter } from "react-router-dom";

@withRouter
@inject("store")
@observer
export default class PrivateRoute extends Component {
  @computed get isAuthenticated() {
    return this.props.store.userStore.authenticated;
  }

  render() {
    if (!this.isAuthenticated) {
      return <Redirect
        to={{
          pathname: "/login",
          state: { from: this.props.location }
        }}
      />
    }

    return <Route {...this.props} />
  }
}
