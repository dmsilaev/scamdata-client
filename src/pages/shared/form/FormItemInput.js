import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';

@observer
class FormItemInput extends Component {
  render() {
    const {
      number,
      field,
      type,
      placeholder,
      className,
      ...restProps
    } = this.props;

    const inputCls = classNames({
      error: field.error && !field.focused
    })

    return (
      <div className={className}>
        {number &&
          <span className="form__field-number">{number}</span>
        }

        <label htmlFor={field.id}>
          {field.label}
          <span className="error">{field.error && "*"}</span>
        </label>

        <InputMask
          className={inputCls}
          autoComplete="off"
          {...field.bind({type, placeholder})}
          {...restProps} />
      </div>
    )
  }
}

FormItemInput.defaultProps = {
  type: 'text',
  placeholder: null,
  className: "form__field"
};

FormItemInput.propTypes = {
  field: PropTypes.object.isRequired
};


export default FormItemInput;
