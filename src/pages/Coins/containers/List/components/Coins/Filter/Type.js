import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import instance from "Connection/instance";
import { Async } from "react-select";

import ArrowDownIcon from "react-icons/lib/md/keyboard-arrow-down";
import ArrowUpIcon from "react-icons/lib/md/keyboard-arrow-up";

@observer
class Type extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  onChange(choosed) {
    const { type } = this.props;
    const { value, label } = choosed;

    const selected = type.values()
      .filter(f => f.id == value)

    if (selected.length == 0)
      type.add({ id: value, name: label })
  }

  getOptions (input) {
    const options = { params: { query: { chars: input } } };

    return instance.get('/api/filters/sources', options)
      .then(response => this.parseFilterData(response))
  }

  parseFilterData(response) {
    const { status, data } = response;
    return { options: data.sources }
  }

  arrowRenderer({ onMouseDown, isOpen }) {
    return isOpen
      ? <ArrowUpIcon />
      : <ArrowDownIcon />
  }

  render() {
    const { type } = this.props;

    return (
      <div className="orders-table__filter">
        <Async
          {...type.bind()}
          clearable={true}
          searchable={true}
          simpleValue={true}
          noResultsText="По Вашему запросу ничего не найдено"
          placeholder={type.placeholder}
          loadOptions={this.getOptions}
          arrowRenderer={this.arrowRenderer}
        />
      </div>
    );
  }
}

Type.propTypes = {
  type: PropTypes.object.isRequired
}

export default Type;
