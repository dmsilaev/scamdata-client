import React, { Component } from "react";
import PropTypes from "prop-types";
import { observable } from "mobx-react";

import DateRangeInput from "Shared/form/DateRangeInput";

class Dates extends Component {
  render() {
    const { check_in, check_out } = this.props;

    return (
      <div className="orders-table__filter double">
        <DateRangeInput
          startDate={check_in}
          endDate={check_out}
          showLabel={false}
          showClearDates={true}
          enableOutsideDays={true}
        />
      </div>
    );
  }
}

Dates.propTypes = {
  check_in: PropTypes.object.isRequired,
  check_out: PropTypes.object.isRequired
}

export default Dates;
