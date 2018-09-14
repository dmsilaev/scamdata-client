import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

import Reservation from "./Reservation";

@observer
class Reservations extends Component {
  render() {
    const { reservations } = this.props;

    const listItems = reservations
      .filter(item => item.state != "cancelled")
      .map(item => <Reservation key={item.id} reservation={item} />)

    return (
      <div className="section">
        {listItems}
      </div>
    );
  }
}

Reservations.propTypes = {
  reservations: PropTypes.array.isRequired
}

export default Reservations;
