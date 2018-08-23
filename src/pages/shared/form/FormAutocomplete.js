import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classNames from "classnames";
import Geosuggest from 'react-geosuggest';

@observer
class FormAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onSuggestNoResults = this.onSuggestNoResults.bind(this);
  }

  onFocus() {}

  onBlur(value) {}

  onChange(value) {}

  onSuggestNoResults(userInput) {}

  onSuggestSelect(suggest) {
    if (!suggest) {
      this.resetFieldValue();
      return;
    };

    const { label, location } = suggest;

    this.props.field.set({
      location: label,
      coordinates: [location.lng, location.lat]
    });

    this.props.field.resetValidation();
  }

  resetFieldValue() {
    this.props.field.set({
      location: "",
      coordinates: undefined
    });

    this.props.field.resetValidation();
  }

  render() {
    const { field, type, placeholder, disabled, className } = this.props;

    const inputCls = classNames({
      error: field.error && !field.focused
    })

    return (
      <div className={className}>
        <Geosuggest
          disabled={disabled}
          initialValue={field.$('location').value}
          placeholder={field.placeholder}
          className={inputCls}
          fixtures={undefined}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onSuggestSelect={this.onSuggestSelect}
          onSuggestNoResults={this.onSuggestNoResults}
        />
      </div>
    )
  }
}

FormAutocomplete.defaultProps = {
  type: 'text',
  placeholder: null,
  className: "form__field",
  disabled: false
};

FormAutocomplete.propTypes = {
  field: PropTypes.object.isRequired
};


export default FormAutocomplete;
