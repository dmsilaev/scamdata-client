import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import Price from "Shared/ui/Price";
import MoneyIcon from "Icons/money.svg";

import TitleWithTraveller from "./TitleWithTraveller";
import TitleWithoutTraveller from "./TitleWithoutTraveller";

@observer
class Slot extends Component {
  render() {
    const { number, slot } = this.props;
    const { price, rate, cash, travellers } = slot;

    return (
      <div className="policies__row">
        <div className="policies__number">
          {number}
        </div>

        {travellers.length > 0
          ? <TitleWithTraveller slot={slot} />
          : <TitleWithoutTraveller slot={slot} />
        }

        <div className="policies__column document">
          <Price price={{amount: price}} />
          {cash && <MoneyIcon />}
        </div>
      </div>
    );
  }
}

Slot.propTypes = {
  number: PropTypes.number.isRequired,
  slot: PropTypes.object.isRequired
}

export default Slot
