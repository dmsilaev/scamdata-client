import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class MenuItem extends Component {
  render() {
    let { path, exact } = this.props.data;

    path = path || "#"
    exact = exact || false

    return (
      <div className="infinity-menu-leaf-container">
        <NavLink exact={exact} to={path}>
          {this.props.name}
        </NavLink>
      </div>
    );
  }
}
