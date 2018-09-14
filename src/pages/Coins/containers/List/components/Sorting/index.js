import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { computed, observable } from "mobx";
import enhanceWithClickOutside from "react-click-outside";

import Values from "./Values";
import Directions from "./Directions";

@inject("sortForm")
@enhanceWithClickOutside
@observer
class Sorting extends Component {
  handleClickOutside(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.handleClickOutside()
  }

  @computed get directions() {
    const { sortForm } = this.props;
    const value = sortForm.$('sort_by').value;

    return sortForm.getDirections(value) || [];
  }

  render() {
    const { sortForm } = this.props;

    return (
      <div className="sorting">
        <div className="sorting__body">
          <Values values={sortForm.sortValues} />
          <Directions directions={this.directions} />
        </div>
      </div>
    );
  }
}

export default Sorting;
