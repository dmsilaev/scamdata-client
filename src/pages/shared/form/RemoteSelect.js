import React, { Component } from "react";
import PropTypes from "prop-types";
import { computed } from "mobx";
import { observer } from "mobx-react";
import classNames from "classnames";
import { Async } from "react-select";

import ArrowDownIcon from "react-icons/lib/md/keyboard-arrow-down";
import ArrowUpIcon from "react-icons/lib/md/keyboard-arrow-up";

@observer
class RemoteSelect extends Component {
  @computed get inputClsName() {
    const { field } = this.props;

    const klass = classNames({
      error: field.error && !field.focused
    })

    return klass;
  }

  arrowRenderer({ onMouseDown, isOpen }) {
    return isOpen
      ? <ArrowUpIcon />
      : <ArrowDownIcon />
  }

  render() {
    const {
      field,
      className,
      showLabel,
      onChange,
      loadOptions
    } = this.props;

    const klass = classNames("form__field", className);

    return (
      <div className={klass}>
        {showLabel &&
          <label htmlFor={field.id}>
            {field.label}
            <span className="error">{field.error && "*"}</span>
          </label>
        }

        <Async
          className={this.inputClsName}
          clearable={true}
          searchable={true}
          simpleValue={false}
          noResultsText="По Вашему запросу ничего не найдено"
          placeholder={field.placeholder}
          loadOptions={loadOptions}
          onChange={onChange}
          arrowRenderer={this.arrowRenderer}
        />
      </div>
    )
  }
}

RemoteSelect.defaultProps = {
  showLabel: true,
  className: "form__field"
};

RemoteSelect.propTypes = {
  field: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  loadOptions: PropTypes.func.isRequired,
};

export default RemoteSelect;
