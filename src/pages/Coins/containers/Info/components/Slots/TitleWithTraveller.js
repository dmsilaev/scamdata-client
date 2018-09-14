import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

@observer
class TitleWithTraveller extends Component {
  render() {
    const { rate, travellers } = this.props.slot;

    const title = travellers
      .map(t => [t.last_name, t.first_name, t.middle_name].join(" "))
      .join(", ")

    return (
      <div className="policies__column title">
        <div className="person">
          <span className="name">{title}</span>
          <br/>
          <span className="rate" title={rate.description}>
            {rate.description}
          </span>
        </div>
      </div>
    );
  }
}

TitleWithTraveller.propTypes = {
  slot: PropTypes.object.isRequired
}

export default TitleWithTraveller
