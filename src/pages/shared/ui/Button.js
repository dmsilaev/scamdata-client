import React, { Component } from "react";
import { observer } from "mobx-react";

const Button = ({ ...props }) => {
  return <a className="_button" onClick={props.onClick}>{props.title}</a>;
};

export default Button;
