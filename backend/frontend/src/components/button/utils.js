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
const WEEKDAYS_NUM = [1, 2, 3, 4, 5, 6, 7];

module.exports = {
  localeUtils: {
    formatWeekdayLong: function(weekday) {
      return WEEKDAYS_LONG[weekday];
    },
    formatWeekdayShort: function(weekday) {
      return WEEKDAYS_SHORT[weekday];
    },
    formatWeekdayNum: function(weekday) {
      return WEEKDAYS_NUM[weekday];
    },
  },
};
