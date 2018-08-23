import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classNames from "classnames";

@observer
class FormInput extends Component {
  render() {
    const { field, type, placeholder, className } = this.props;

    const inputCls = classNames(className, {
      error: field.error && !field.focused
    })

    return (
      <input className={inputCls} {...field.bind({type, placeholder})} />
    )
  }
}

FormInput.defaultProps = {
  type: 'text',
  placeholder: null,
  className: ""
};

FormInput.propTypes = {
  field: PropTypes.object.isRequired
};


export default FormInput;
