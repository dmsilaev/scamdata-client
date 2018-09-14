import moment from "Utils/moment";
import twix from "twix";

const defaultOptions = {
  implicitYear: false,
}

export const dateRangeFormat = (date1, date2, format = defaultOptions) => {
  return moment(date1)
    .twix(date2, { allDay: true })
    .format(format)
}

export const dateFormat = (date, format = 'LLL') => {
  return moment(date).format(format);
}
