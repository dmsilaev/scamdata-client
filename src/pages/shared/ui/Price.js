import React, { Component } from 'react';
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

class Price extends Component {
  render() {
    const { amount, currency } = this.props.price;

    return (
      <NumberFormat
        value={amount}
        suffix={" ₽"}
        displayType={"text"}
        decimalScale={2}
        thousandSeparator={" "}
      />
    );
  }
}

Price.propTypes = {
  price: PropTypes.object.isRequired,
};

export default Price;
