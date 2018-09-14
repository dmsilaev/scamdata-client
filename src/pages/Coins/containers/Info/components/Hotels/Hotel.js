import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

import Header from "./Header";
import Reservations from "../Reservations";

@observer
class Hotel extends Component {
  render() {
    const { hotel } = this.props;

    return (
      <div className="groups__item">
        <div className="groups__item-content">
          <div className="reservation-group">
            <div className="reservation-group__content">
              <Header hotel={hotel} />
              <Reservations hotel={hotel} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Hotel.propTypes = {
  hotel: PropTypes.object.isRequired
}

export default Hotel;
