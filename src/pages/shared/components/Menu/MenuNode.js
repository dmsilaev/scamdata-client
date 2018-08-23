import React, { Component } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

export default class MenuNode extends Component {
  render() {
    const path = this.props.data.path || "#"

    const className = classNames("infinity-menu-node-container", {
      active: !this.props.data.path && this.props.isOpen
    })

    return (
      <div className={className} onClick={this.props.onClick}>
        <NavLink to={path}>
          {this.props.name}
        </NavLink>
      </div>
    );
  }
}
