import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import Slot from "./Slot";

@observer
class Slots extends Component {
  render() {
    const listItems = this.props.slots
      .filter(item => item.state != "cancelled")
      .map((item, number) => <Slot key={item.id} number={number + 1} slot={item} />)

    return (
      <div className="policies divided">
        {listItems}
      </div>
    );
  }
}

Slots.propTypes = {
  slots: PropTypes.array.isRequired
}

export default Slots
