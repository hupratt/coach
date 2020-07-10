import React from "react";
import WeekdayPicker from "./WeekPicker";

// const modifiers = {
//   weekend: (weekday) => {
//     return weekday == 0 || weekday == 6;
//   },
// };

const MyWeekdayPicker = () => {
  return (
    <WeekdayPicker
      onWeekdayClick={(e) =>
        e &&
        e.target &&
        e.target.getAttribute("weeknum") &&
        console.log("e", e.target.getAttribute("weeknum"))
      }
    />
  );
};
export default MyWeekdayPicker;
