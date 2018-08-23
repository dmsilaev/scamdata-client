import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Textarea from 'react-textarea-autosize';
import classNames from "classnames";

@observer
class FormItemText extends Component {
  render() {
    const { field, type, placeholder, rows, cols, className, showLabel } = this.props;

    const inputCls = classNames({
      error: field.error && !field.focused
    })

    return (
      <div className={className}>
        {showLabel && <label htmlFor={field.id}>
            {field.label}
            <span className="error">{field.error && "*"}</span>
          </label>
        }

        <Textarea
          className={inputCls}
          minRows={rows}
          {...field.bind({type, placeholder})}
        ></Textarea>
      </div>
    )
  }
}

FormItemText.defaultProps = {
  rows: 3,
  cols: 3,
  placeholder: null,
  className: "form__field",
  showLabel: true
};

FormItemText.propTypes = {
  field: PropTypes.object.isRequired
};

export default FormItemText;
