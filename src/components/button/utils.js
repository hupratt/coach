const WEEKDAYS_LONG = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const WEEKDAYS_SHORT = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

module.exports = {
  localeUtils: {
    formatWeekdayLong: function(weekday) {
      return WEEKDAYS_LONG[weekday];
    },
    formatWeekdayShort: function(weekday) {
      return WEEKDAYS_SHORT[weekday];
    },
  },
};
