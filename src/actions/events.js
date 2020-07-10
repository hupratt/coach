import { api, BASE, API_EVENTS } from "./api";
import * as actionTypes from "../actions/actionTypes";
import _ from "lodash";

const COMPLETION = {
  /* Shades of Green 
    https://colorswall.com/palette/16/
    */
  100: "#388e3c",
  80: "#4caf50",
  60: "#81c784",
  40: "#a5d6a7",
  20: "#c8e6c9",
  0: "#e8f5e9",
};
const getColorFromRate = (rate) => {
  if (rate === 1) {
    return COMPLETION[100];
  } else if (_.inRange(rate, 0.8, 1)) {
    return COMPLETION[80];
  } else if (_.inRange(rate, 0.6, 0.8)) {
    return COMPLETION[60];
  } else if (_.inRange(rate, 0.4, 6)) {
    return COMPLETION[40];
  } else if (_.inRange(rate, 0.2, 0.4)) {
    return COMPLETION[20];
  } else if (_.inRange(rate, 0, 0.2)) {
    return COMPLETION[0];
  }
};

const getDatefromYearAndWeek = (w, y) => {
  var d = 1 + (w - 1) * 7; // 1st of January + 7 days for each week
  return new Date(y, 0, d);
};

const dispatch_events = (events) => {
  return {
    type: actionTypes.GRAB_EVENTS,
    events,
  };
};

export const grabEvents = () => {
  let EVENTS = [];
  return (dispatch) => {
    api
      .get(`${BASE}/${API_EVENTS}/`)
      .then((res) => {
        const { data } = res.data;
        data.forEach((element) => {
          const {
            task__period,
            week,
            clocked,
            task__title,
            year,
            status,
          } = element;
          if (status === "DONE") {
            EVENTS.push({
              date_start: getDatefromYearAndWeek(week, year),
              date_end: getDatefromYearAndWeek(week, year),
              title: task__title,
              color: getColorFromRate(clocked / task__period),
              week,
            });
          }
        });
        dispatch(dispatch_events(EVENTS));
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FAIL, error: err });
      });
  };
};
