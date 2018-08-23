import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Select from 'react-select';

@observer
class FormSingleSelect extends Component {
  render() {
    const {
      field,
      type,
      placeholder,
      className,
      options,
      searchable,
      clearable
    } = this.props;

    const selectOptions = options || field.extra || []

    return (
      <Select
        {...field.bind()}
        className={className}
        value={field.value}
        options={selectOptions}
        clearable={clearable}
        searchable={searchable}
        simpleValue={true}
        disabled={!selectOptions.length}
        autofocus={true}
        noResultsText={"Не найдено"}
      />
    )
  }
}

FormSingleSelect.defaultProps = {
  type: 'text',
  placeholder: null,
  className: "",
  searchable: false,
  clearable: false,
};

FormSingleSelect.propTypes = {
  field: PropTypes.object.isRequired
};


export default FormSingleSelect;
