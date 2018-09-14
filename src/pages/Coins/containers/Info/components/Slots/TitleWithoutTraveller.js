import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

@observer
class TitleWithoutTraveller extends Component {
  render() {
    const { rate } = this.props.slot;

    return (
      <div className="policies__column title">
        {rate.description}
      </div>
    );
  }
}

TitleWithoutTraveller.propTypes = {
  slot: PropTypes.object.isRequired
}

export default TitleWithoutTraveller
