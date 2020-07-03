// fork from : https://github.com/onejgordon/react-life-timeline
import React from "react";
import ReactLifeTimeline from "./react-life-timeline";
import "./react-life-timeline.min.css";
import { api, API_EVENTS } from "../actions/api";
import { BASE } from "../constants";
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
  if (rate == 1) {
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
export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      lookup: {},
      loaded: false,
      today: new Date(),
      events_added: 0,
      timeout_id: null,
    };
    this.EVENTS = [];
    api.get(`${BASE}/${API_EVENTS}/`).then((res) => {
      const { data } = res.data;
      data.forEach((element) => {
        const {
          task,
          task__period,
          week,
          clocked,
          task__title,
          year,
        } = element;
        this.EVENTS.push({
          date_start: getDatefromYearAndWeek(week, year),
          date_end: getDatefromYearAndWeek(week, year),
          title: task__title,
          color: getColorFromRate(clocked / task__period),
        });
      });
    });
  }

  generate_events(cb) {
    cb(this.EVENTS);
  }

  componentDidMount() {}

  add_incremental_event(force_index) {
    let { events_added } = this.state;
    let next_index = force_index == null ? events_added + 1 : force_index;
    if (next_index < this.EVENTS.length) {
      this.setState({ events_added: next_index }, () => {
        let timeout_id = window.setTimeout(
          this.add_incremental_event.bind(this),
          1000
        );
        this.setState({ timeout_id: timeout_id });
      });
    }
  }

  incremental_events() {
    return this.EVENTS.slice(0, this.state.events_added);
  }

  restart_incremental() {
    let { timeout_id } = this.state;
    if (timeout_id != null) window.clearInterval(timeout_id);
    this.add_incremental_event(0);
  }

  render() {
    return (
      <div className="container">
        <h2>Calendar - 2020</h2>
        <ReactLifeTimeline
          subject_name="John"
          birthday={new Date("2020-04-17")}
          events={this.EVENTS}
        />
      </div>
    );
  }
}

ReactLifeTimeline.defaultProps = {
  birthday: null, // Date object
  birthday_color: "white",
  events: [],
  project_days: 365, // Days into future to project,
  subject_name: null, // Person's name (otherwise 'I')
  get_events: null, // Function to get events (e.g. via API resource)
};
