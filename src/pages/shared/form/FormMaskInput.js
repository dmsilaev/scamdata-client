import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import InputMask from 'react-input-mask';

@observer
class FormMaskInput extends Component {
  render() {
    const { field, type, placeholder, ...restProps } = this.props;

    return (
      <InputMask
        autoComplete="off"
        {...field.bind({type, placeholder})}
        {...restProps}
      />
    )
  }
}

FormMaskInput.defaultProps = {
  placeholder: null,
  type: "text"
};

FormMaskInput.propTypes = {
  field: PropTypes.object.isRequired
};


export default FormMaskInput;
