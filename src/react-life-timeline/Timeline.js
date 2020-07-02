// fork from : https://github.com/onejgordon/react-life-timeline
import React from "react";
import ReactLifeTimeline from "./react-life-timeline";
import "./react-life-timeline.min.css";
import { API_LOGIN, api, API_BOARDS, API_TASKS, API_COLUMNS, API_EVENTS } from "../actions/api"
import { BASE } from "../constants";



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
    this.EVENTS = []
    api.get(`${BASE}/${API_EVENTS}/`).then((res) => {
      const { data } = res.data;
      data.forEach(element => {
        const {task, task__period, week, clocked } = element
        this.EVENTS.push({
          date_start: getDateOfWeek(week,2020),
          date_end: getDateOfWeek(week,2020),
          title: "Spot event",
          color: "#D7421B",
        })
      });
      
    });
  }

  generate_events(cb) {
    cb(this.EVENTS);
  }

  componentDidMount() {
    this.setState((prevState) => {
      return {
          ...prevState,
          events: this.EVENTS,
      }
    }, ()=>console.log('EVENTS', this.state.events));
  }

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
