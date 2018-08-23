import React, { Component } from 'react';
import PropTypes from "prop-types";
import { pluralize } from "Utils/pluralize";

class Capacity extends Component {
  render() {
    const { rooms_count, beds_count } = this.props;

    const beds_str = pluralize(beds_count, "место", "места", "мест");
    const rooms_str = pluralize(rooms_count, "номере", "номерах", "номерах");

    return (
      <span>
        {beds_count} {beds_str} в {rooms_count} {rooms_str}
      </span>
    );
  }
}

Capacity.propTypes = {
  rooms_count: PropTypes.any.isRequired,
  beds_count: PropTypes.any.isRequired
};

export default Capacity;
