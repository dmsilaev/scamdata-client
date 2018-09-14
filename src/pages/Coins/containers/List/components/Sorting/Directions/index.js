import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";

import Direction from "./Direction";

@observer
class Directions extends Component {
  render() {
    const listItems = this.props.directions.map((direction) => {
      return <Direction key={direction.id} direction={direction} />
    })

    return (
      <div className="list">
        {listItems}
      </div>
    );
  }
}

Directions.propTypes = {
  directions: PropTypes.array.isRequired
}

export default Directions;
