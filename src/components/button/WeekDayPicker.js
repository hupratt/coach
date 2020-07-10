import React from "react";
import WeekdayPicker from "./WeekPicker";

// const modifiers = {
//   weekend: (weekday) => {
//     return weekday == 0 || weekday == 6;
//   },
// };

const MyWeekdayPicker = () => {
  return (
    <WeekdayPicker onWeekdayClick={(e) => console.log("e", e.target.title)} />
  );
};
export default MyWeekdayPicker;
