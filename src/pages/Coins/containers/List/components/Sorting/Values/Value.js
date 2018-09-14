import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { computed } from "mobx";
import classNames from "classnames";

@inject("sortForm")
@observer
class Value extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  @computed get isSelected() {
    const { value, sortForm } = this.props;
    return value.field == sortForm.$('sort_by').value;
  }

  clickHandler(e) {
    e.preventDefault()

    const { value, sortForm } = this.props;
    sortForm.$('sort_by').set(value.field);
  }

  render() {
    const { value } = this.props;

    const className = classNames("item", {
      active: this.isSelected
    })

    return (
      <div
        className={className}
        onClick={this.clickHandler}
      >
        {value.desc}
      </div>
    );
  }
}

Value.propTypes = {
  value: PropTypes.object.isRequired
}

export default Value;
