import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { computed, observable } from "mobx";
import classNames from "classnames";

@inject("sortForm")
@observer
class Direction extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  @computed get isSelected() {
    const { direction, sortForm } = this.props;
    return direction.value == sortForm.$('direction').value;
  }

  clickHandler(e) {
    e.preventDefault()

    const { direction, sortForm } = this.props;
    sortForm.$('direction').set(direction.value);
  }

  render() {
    const { direction } = this.props;

    const className = classNames("item", {
      active: this.isSelected
    })

    return (
      <div
        className={className}
        onClick={this.clickHandler}
      >
        {direction.desc}
      </div>
    );
  }
}

Direction.propTypes = {
  direction: PropTypes.object.isRequired
}

export default Direction;
