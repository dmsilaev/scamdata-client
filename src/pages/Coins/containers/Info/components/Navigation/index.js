import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

import CloseIcon from "react-icons/lib/md/close";

@observer
class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <div className="content">
          <div className="navigation__item"></div>

          <div className="navigation__item">
            <Link to="/orders">
              <i className="icon">
                <CloseIcon />
              </i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
