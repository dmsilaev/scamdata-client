import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classNames from "classnames";

import NumberFormat from "react-number-format";

@observer
class FormattedInputField extends Component {
  onValueChange = (values) => {
    const { value } = values;
    this.props.field.set(value);
  }

  render() {
    const { field, type, placeholder, label, className, ...restProps } = this.props;

    const inputCls = classNames({
      error: field.error && !field.focused
    })

    return (
      <div className={className}>
        <label htmlFor={field.id}>
          {label || field.label}
          <span className="error">{field.error && "*"}</span>
        </label>

        <NumberFormat
          {...field.bind(type, placeholder)}
          type={type}
          value={field.value}
          autoComplete="off"
          placeholder={field.placeholder}
          className={inputCls}
          onValueChange={this.onValueChange}
          {...restProps}
        />
      </div>
    )
  }
}

FormattedInputField.defaultProps = {
  placeholder: null,
  type: "text",
  className: "form__field"
};

FormattedInputField.propTypes = {
  field: PropTypes.object.isRequired
};

export default FormattedInputField;
