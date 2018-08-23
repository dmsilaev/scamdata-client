import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import NumberFormat from "react-number-format";

@observer
class FormFormattedInput extends Component {
  onValueChange = (values) => {
    const { value } = values;
    this.props.field.set(value);
  }

  render() {
    const { field, type, placeholder, ...restProps } = this.props;

    return (
      <NumberFormat
        autoComplete="off"
        type={type}
        value={field.value}
        placeholder={field.placeholder}
        onValueChange={this.onValueChange}
        {...restProps}
      />
    )
  }
}

FormFormattedInput.defaultProps = {
  placeholder: null,
  type: "text"
};

FormFormattedInput.propTypes = {
  field: PropTypes.object.isRequired
};


export default FormFormattedInput;
