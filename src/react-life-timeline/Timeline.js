// fork from : https://github.com/onejgordon/react-life-timeline
import React from "react";
import ReactLifeTimeline from "./react-life-timeline";
import "./react-life-timeline.min.css";

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
    this.EVENTS_WITH_ONGOING = [
      {
        date_start: new Date("2017-02-01"),
        date_end: new Date("2017-02-20"),
        title: "Sample prior event",
        color: "#FC004C",
      },
      {
        date_start: new Date("2017-04-01"),
        title: "Sample ongoing event",
        color: "#D7421B",
        ongoing: true,
      },
    ];

    let today = new Date();
    let future_start = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    );
    let future_end = new Date(future_start.getTime());
    future_end.setDate(future_end.getDate() + 7);
    this.EVENTS_WITH_FUTURE = [
      {
        date_start: new Date("2017-02-01"),
        date_end: new Date("2017-02-20"),
        title: "Sample prior event",
        color: "#FC004C",
      },
      {
        date_start: future_start,
        date_end: future_end,
        title: "Sample future event",
        color: "#FD691C",
      },
    ];
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
        <h2>With Ongoing Event</h2>

        <ReactLifeTimeline
          subject_name="John"
          birthday={new Date("2017-01-01")}
          events={this.EVENTS_WITH_ONGOING}
        />

        <h2>With Future Event</h2>

        <ReactLifeTimeline
          subject_name="John"
          birthday={new Date("2017-01-01")}
          events={this.EVENTS_WITH_FUTURE}
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
