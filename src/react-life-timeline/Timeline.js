// fork from : https://github.com/onejgordon/react-life-timeline
import React from "react";
import ReactLifeTimeline from "./react-life-timeline";
import "./react-life-timeline.min.css";

const getDateOfWeek=(w, y) => {
  var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
  return new Date(y, 0, d);
}
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
    let today = new Date();
    let future_start = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    );
    let future_end = new Date(future_start.getTime());
    future_end.setDate(future_end.getDate() + 7);
    console.log("future_start", future_start);
    console.log("future_end", future_end);
    console.log('new Date("2020-09-01")', new Date("2020-09-01"));
    console.log('getDateOfWeek(26,2020)', getDateOfWeek(26,2020));
    this.EVENTS = [
      {
        date_start: getDateOfWeek(24,2020),
        date_end: getDateOfWeek(24,2020),
        title: "Spot event",
        color: "#D7421B",
      },
    ];
    console.log('EVENTS', this.EVENTS);
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
      <div>
        <h2>Calendar</h2>

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
  birthday_color: "#F89542",
  events: [],
  project_days: 200, // Days into future to project,
  subject_name: null, // Person's name (otherwise 'I')
  get_events: null, // Function to get events (e.g. via API resource)
};
