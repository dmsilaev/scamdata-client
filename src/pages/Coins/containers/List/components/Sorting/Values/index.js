import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";

import Value from "./Value";

@observer
class Values extends Component {
  render() {
    const listItems = this.props.values.map((value) => {
      return <Value key={value.id} value={value} />
    })

    return (
      <div className="list">
        {listItems}
      </div>
    );
  }
}

Values.propTypes = {
  values: PropTypes.array.isRequired
}

export default Values;
