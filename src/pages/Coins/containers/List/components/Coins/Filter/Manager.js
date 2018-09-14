import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import instance from "Connection/instance";
import { Async } from "react-select";

import ArrowDownIcon from "react-icons/lib/md/keyboard-arrow-down";
import ArrowUpIcon from "react-icons/lib/md/keyboard-arrow-up";

@observer
class Manager extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  onChange(choosed) {
    const { field } = this.props;
    const { value, label } = choosed;

    const selected = field.values()
      .filter(f => f.id == value)

    if (selected.length == 0)
      field.add({ id: value, name: label })
  }

  getOptions (input) {
    const options = { params: { query: { chars: input } } };

    return instance.get('/api/filters/managers', options)
      .then(response => this.parseFilterData(response))
  }

  parseFilterData(response) {
    const { status, data } = response;
    return { options: data.managers }
  }

  arrowRenderer({ onMouseDown, isOpen }) {
    return isOpen
      ? <ArrowUpIcon />
      : <ArrowDownIcon />
  }

  render() {
    const { field } = this.props;

    return (
      <div className="orders-table__filter">
        <Async
          {...field.bind()}
          clearable={true}
          searchable={true}
          simpleValue={true}
          noResultsText="По Вашему запросу ничего не найдено"
          placeholder={field.placeholder}
          loadOptions={this.getOptions}
          arrowRenderer={this.arrowRenderer}
        />
      </div>
    );
  }
}

Manager.propTypes = {
  field: PropTypes.object.isRequired
}

export default Manager;
