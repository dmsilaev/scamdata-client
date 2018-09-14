import React, { Component } from "react";
import PropTypes from "prop-types";
import { observable } from "mobx-react";

import SingleSelect from "Shared/form/SingleSelect";

class Status extends Component {
  render() {
    const { status } = this.props;

    return (
      <div className="orders-table__filter">
        <SingleSelect
          showLabel={false}
          clearable={true}
          field={status}
        />
      </div>
    );
  }
}

Status.propTypes = {
  status: PropTypes.object.isRequired,
}

export default Status;
