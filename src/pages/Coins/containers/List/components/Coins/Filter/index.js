import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import Hotel from "./Hotel";
import Manager from "./Manager";
import Dates from "./Dates";
import Status from "./Status";
import Type from "./Type";

@inject("filterForm")
@observer
class Filter extends Component {
  render() {
    const { filterForm } = this.props;

    return (
      <div className="orders-table__header">
        <div className="orders-table__tr">
          <div className="orders-table__td"></div>
          <div className="orders-table__td"></div>

          <div className="orders-table__td">
            <Dates
              check_in={filterForm.$("check_in")}
              check_out={filterForm.$("check_out")}
            />
          </div>

          <div className="orders-table__td"></div>
          <div className="orders-table__td">
            <Type type={filterForm.$("type")} />
          </div>
          <div className="orders-table__td">
            <Manager field={filterForm.$("manager")} />
          </div>
          <div className="orders-table__td"></div>
          <div className="orders-table__td">
            <Status status={filterForm.$("status")} />
          </div>
        </div>
      </div>
    );
  }
}

// Filter.propTypes = {
//   field: PropTypes.object.isRequired
// }

export default Filter;
