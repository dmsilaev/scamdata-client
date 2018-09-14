import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";

@withRouter
class TopBarActionBox extends Component {
  render() {
    return (
      <div className="action-box">
        <form method="post" action="" className="form">
          {/*<NavLink
            exact
            activeClassName={"disabled"}
            to="/orders/new"
            className="button green"
          >
            <FormattedMessage id='orders.add' />
          </NavLink>*/}
        </form>
      </div>
    );
  }
}

export default TopBarActionBox
