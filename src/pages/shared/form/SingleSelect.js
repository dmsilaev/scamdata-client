import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { computed } from "mobx";
import { observer } from "mobx-react";
import classNames from "classnames";
import Select from 'react-select';

import ArrowDownIcon from "react-icons/lib/md/keyboard-arrow-down";
import ArrowUpIcon from "react-icons/lib/md/keyboard-arrow-up";

@observer
class SingleSelect extends Component {
  constructor(props) {
    super(props);

    this.arrowRenderer = this.arrowRenderer.bind(this);
  }

  arrowRenderer({ onMouseDown, isOpen }) {
    return isOpen
      ? <ArrowUpIcon />
      : <ArrowDownIcon />
  }

  @computed get inputClsName() {
    const { field } = this.props;

    const klass = classNames({
      error: field.error && !field.focused
    })

    return klass;
  }

  @computed get selectOptions() {
    const { field, options } = this.props;
    return options || field.extra || []
  }

  render() {
    const { className, style, field, showLabel, clearable } = this.props;

    const klass = classNames("form__field", className);

    return (
      <div className={klass} style={style}>
        {showLabel &&
          <label htmlFor={field.id}>
            {field.label}
            <span className="error">{field.error && "*"}</span>
          </label>
        }

        <Select
          {...field.bind()}
          className={this.inputClsName}
          value={field.value}
          options={this.selectOptions}
          clearable={clearable}
          searchable={false}
          simpleValue={true}
          disabled={!this.selectOptions.length}
          arrowRenderer={this.arrowRenderer}
        />
      </div>
    )
  }
}

SingleSelect.defaultProps = {
  clearable: false,
  showLabel: true,
  className: "form__field",
  style: {}
};

SingleSelect.propTypes = {
  field: PropTypes.object.isRequired
};


export default SingleSelect;
