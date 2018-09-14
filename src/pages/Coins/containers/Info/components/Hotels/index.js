import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

import Hotel from "./Hotel";
import Control from "./Control";

@observer
class Hotels extends Component {
  render() {
    const listItems = this.props.hotels.map((item) => {
      return <Hotel key={item.id} hotel={item} />
    })

    return (
      <div className="groups">
        {listItems}
        <Control />
      </div>
    );
  }
}

Hotels.propTypes = {
  hotels: PropTypes.object.isRequired
}

export default Hotels;
