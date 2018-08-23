import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { computed, observable } from "mobx";
import { observer } from 'mobx-react';
import classNames from "classnames";
import { DayPickerRangeController } from "react-dates";
import moment from "Utils/moment";

import ArrowLeft from "react-icons/lib/md/chevron-left";
import ArrowRight from "react-icons/lib/md/chevron-right";

class NavPrev extends Component {
  render() {
    return (
      <ArrowLeft />
    )
  }
}

class NavNext extends Component {
  render() {
    return (
      <ArrowRight />
    )
  }
}

@observer
class DateRangeController extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  @observable focusedInput = 'startDate';

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

  onDateChange(dates) {
    const { startDate, endDate } = dates;

    if (startDate) {
      const value = startDate.toISOString()
      this.props.startDate.set(value);
      this.props.startDate.resetValidation()
    }

    if (endDate) {
      const value = endDate.toISOString()
      this.props.endDate.set(value);
      this.props.endDate.resetValidation()
    }
  }

  onFocusChange(focusedInput) {
    this.focusedInput = !focusedInput ? 'startDate' : focusedInput
  }

  isOutsideRange(day) {
    return moment().add(12, 'hours').isAfter(day)
  }

  render() {
    const { className, startDate, endDate } = this.props;

    const klass = classNames([className, 'calendar']);

    return (
      <div className={klass}>
        <DayPickerRangeController
          startDate={this.startDateObj}
          endDate={this.endDateObj}
          onDatesChange={this.onDateChange}
          focusedInput={this.focusedInput}
          onFocusChange={this.onFocusChange}
          hideKeyboardShortcutsPanel={true}
          isOutsideRange={this.isOutsideRange}
          daySize={32}
          numberOfMonths={2}
          navPrev={<NavPrev />}
          navNext={<NavNext />}
        />
      </div>
    )
  }
}

DateRangeController.defaultProps = {
  className: "form__field centered"
}

DateRangeController.propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired
};

export default DateRangeController;
