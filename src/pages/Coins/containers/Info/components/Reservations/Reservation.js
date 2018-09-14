import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { dateRangeFormat } from "Utils/dateFormat";
import { withRouter } from "react-router-dom";

import Price from "Shared/ui/Price";
import Slots from "../Slots";

@withRouter
@observer
class Reservation extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();

    const { id } = this.props.reservation;
    this.props.history.push(`/dashboard/${id}`)
  }

  render() {
    const {
      id,
      slots,
      price,
      check_in,
      check_out,
      tariff,
      room_type
    } = this.props.reservation;

    return (
      <div className="section">
        <div className="section__header" onClick={this.clickHandler}>
          <div className="content">
            {[room_type.name, tariff.name].join(" — ")}
            <div className="sub">
              {dateRangeFormat(check_in, check_out)}
            </div>
          </div>
          <div className="price">
            <Price price={{amount: price}} />
          </div>
        </div>

        <div className="section__content">
          <Slots slots={slots} />
        </div>
      </div>
    )
  }
}

Reservation.propTypes = {
  reservation: PropTypes.object.isRequired
}

export default Reservation;
