import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

@observer
class Traveller extends Component {
  render() {
    const { number, traveller } = this.props;

    return (
      <div className="travellers__row">
        <div className="travellers__number">
          {number}
        </div>

        <div className="travellers__column title">
          {traveller.fullName}
        </div>

        <div className="travellers__column document">
          {traveller.document.number}
        </div>
      </div>
    );
  }
}

Traveller.propTypes = {
  traveller: PropTypes.object.isRequired,
  number: PropTypes.any.isRequired
}

export default Traveller;
