import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { computed } from "mobx";
import classNames from "classnames";

import DownIcon from "react-icons/lib/md/keyboard-arrow-down";
import UpIcon from "react-icons/lib/md/keyboard-arrow-up";
import { FormattedMessage } from "react-intl";

@inject("sortForm")
@observer
class Header extends Component {
  constructor(props) {
    super(props);

    this.sortByHandler = this.sortByHandler.bind(this);
  }

  sortByHandler(e) {
    e.preventDefault();

    const sortBy = this.props.sortForm.$('sort_by');
    const direction = this.props.sortForm.$('direction');

    const { field } = e.target.dataset;

    if (field && sortBy.value == field) {
      sortBy.set(field);
      direction.set(-1*direction.value);
    } else if (field) {
      sortBy.set(field);
      direction.set(-1);
    }
  }

  @computed get SortIcon() {
    const { sortForm } = this.props;

    return sortForm.$('direction').value > 0
      ? <DownIcon />
      : <UpIcon />;
  }

  render() {
    const { sortForm } = this.props;

    const sortBy = sortForm.$('sort_by').value;
    const direction = sortForm.$('direction').value;

    return (
      <div className="coins-table__tr">
        <div className="coins-table__th name">
          system_id
        </div>
        <div className="coins-table__th symbol">
          symbol
        </div>
         <div className="coins-table__th symbol">
          name
        </div>
        <div className="coins-table__th symbol">
          exchanges
        </div>

        <span className="icon">{this.SortIcon}</span>
      </div>
    );
  }
}

export default Header;
