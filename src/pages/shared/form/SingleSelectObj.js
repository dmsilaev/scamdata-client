import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { computed } from "mobx";
import { observer } from "mobx-react";
import classNames from "classnames";
import Select from 'react-select';
import _pick from "lodash/pick";

import ArrowDownIcon from "react-icons/lib/md/keyboard-arrow-down";
import ArrowUpIcon from "react-icons/lib/md/keyboard-arrow-up";

@observer
class SingleSelectObj extends Component {
  arrowRenderer = ({ onMouseDown, isOpen }) => {
    return isOpen
      ? <ArrowUpIcon />
      : <ArrowDownIcon />
  }

  onChange = (value) => {
    const { field } = this.props;
    field.set(value)
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
    const {
      className,
      style,
      field,
      isLoading,
      showLabel,
      clearable,
      searchable,
      valueKey,
      labelKey,
      simpleValue
    } = this.props;

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
          {...field.bind({ onChange: this.onChange })}
          isLoading={isLoading}
          className={this.inputClsName}
          valueKey={valueKey}
          labelKey={labelKey}
          options={this.selectOptions}
          clearable={clearable}
          searchable={searchable}
          simpleValue={simpleValue}
          disabled={!this.selectOptions.length}
          arrowRenderer={this.arrowRenderer}
        />
      </div>
    )
  }
}

SingleSelectObj.defaultProps = {
  isLoading: false,
  clearable: false,
  showLabel: true,
  searchable: false,
  valueKey: "value",
  labelKey: "label",
  simpleValue: true,
  className: "form__field",
  style: {}
};

SingleSelectObj.propTypes = {
  field: PropTypes.object.isRequired
};


export default SingleSelectObj;
