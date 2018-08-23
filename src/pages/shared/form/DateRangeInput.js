import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { computed, observable } from "mobx";
import { observer } from 'mobx-react';
import classNames from "classnames";
import { DateRangePicker } from "react-dates";
import moment from "Utils/moment";

import ArrowLeftIcon from "react-icons/lib/md/chevron-left";
import ArrowRightIcon from "react-icons/lib/md/chevron-right";
import MdDateRangeIcon from "react-icons/lib/md/date-range";
import CloseIcon from "react-icons/lib/md/close";

class ArrowIcon extends Component {
  render() {
    return <span>—</span>
  }
}


@observer
class DateRangeInput extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  @observable focusedInput = null;

  @computed get startDateObj() {
    const { value } = this.props.startDate;
    return value ? moment(value) : null;
  }

  @computed get endDateObj() {
    const { value } = this.props.endDate;
    return value ? moment(value) : null;
  }

  @computed get isError() {
    const { startDate, endDate } = this.props;

    return (startDate.error && !startDate.focused)
      || (endDate.error && !endDate.focused)
  }

  isOutsideRange(day) {
    return false;
  }

  onDateChange(dates) {
    let { startDate, endDate } = dates;

    if (startDate) startDate = startDate.format('Y-MM-DD');
    this.props.startDate.set(startDate);
    this.props.startDate.resetValidation()


    if (endDate) endDate = endDate.format('Y-MM-DD');
    this.props.endDate.set(endDate);
    this.props.endDate.resetValidation();
  }

  onFocusChange(focusedInput) {
    this.focusedInput = focusedInput
  }

  render() {
    const {
      className,
      showLabel,
      startDate,
      endDate,
      disabled,
      enableOutsideDays,
      showClearDates
    } = this.props;

    const klass = classNames("form__field", className, {
      error: this.isError
    })

    return (
      <div className={klass}>
        {showLabel &&
          <label htmlFor={startDate.id}>
            {startDate.label}
            <span className="error">{this.isError && "*"}</span>
          </label>
        }

        <DateRangePicker
          startDate={this.startDateObj}
          endDate={this.endDateObj}
          onDatesChange={this.onDateChange}
          focusedInput={this.focusedInput}
          onFocusChange={this.onFocusChange}
          showDefaultInputIcon={false}
          hideKeyboardShortcutsPanel={true}
          daySize={32}
          startDateId={startDate.id}
          startDatePlaceholderText={startDate.placeholder}
          endDateId={endDate.id}
          endDatePlaceholderText={endDate.placeholder}
          customArrowIcon={<ArrowIcon />}
          navPrev={<ArrowLeftIcon />}
          navNext={<ArrowRightIcon />}
          disabled={disabled}
          readOnly={disabled}
          enableOutsideDays={enableOutsideDays}
          isOutsideRange={enableOutsideDays ? this.isOutsideRange : undefined}
          showClearDates={showClearDates}
          customCloseIcon={<CloseIcon />}
        />
      </div>
    )
  }
}

DateRangeInput.defaultProps = {
  className: "",
  showLabel: true,
  disabled: false,
  enableOutsideDays: false,
  showClearDates: false
}

DateRangeInput.propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired
};

export default DateRangeInput;
