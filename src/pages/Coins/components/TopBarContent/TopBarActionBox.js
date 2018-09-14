import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";

@withRouter
export default class TopBarActionBox extends Component {
  render() {
    return (
      <div className="action-box">
        <form method="post" action="" className="form">
          {/*<NavLink
            exact
            activeClassName={"disabled"}
            to="/dashboard/new"
            className="button green"
          >
            Новая бронь
          </NavLink>*/}
        </form>
      </div>
    );
  }
}
