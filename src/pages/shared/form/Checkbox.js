import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react";

@observer
class Checkbox extends Component {
  render() {
    const { field, className, type } = this.props;

    return (
      <div className={className}>
        <label htmlFor={field.id}>
          <input {...field.bind(type)} /> {field.label}
        </label>
      </div>
    )
  }
}

Checkbox.defaultProps = {
  className: "form__field",
  type: "checkbox"
};

Checkbox.propTypes = {
  field: PropTypes.object.isRequired
};


export default Checkbox;
