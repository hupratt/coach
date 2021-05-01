// fork from : https://github.com/onejgordon/react-life-timeline
import React from "react";
import ReactLifeTimeline from "./react-life-timeline";

import "./react-life-timeline.min.css";
import { connect } from "react-redux";
import { grabEvents } from "../actions/events";

const diffDays = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const daysLeftEndOfYear = (date1, date2) => {
  return 365 - diffDays(date1, date2);
};

function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}

class Timeline extends React.Component {
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
  }

  componentDidMount() {
    localStorage.getItem("token") &&
      setTimeout(() => this.props.fetchEvents(), 1000);
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
    return this.props.events.slice(0, this.state.events_added);
  }

  restart_incremental() {
    let { timeout_id } = this.state;
    if (timeout_id != null) window.clearInterval(timeout_id);
    this.add_incremental_event(0);
  }

  render() {
    const blur = this.props.visible ? "blur" : "";
    var weekNum = getWeekNumber(new Date());

    return (
      <div className={`container see-through ${blur}`}>
        <h2>{'week ' + weekNum[1]}</h2>
        <ReactLifeTimeline
          subject_name="Hugo"
          birthday={new Date("1990-04-17")}
          events={this.props.events}
          project_days={daysLeftEndOfYear(new Date("2021-01-01"), new Date())}
          show={this.props.show}
        />
      </div>
    );
  }
}

ReactLifeTimeline.defaultProps = {
  birthday: null, // Date object
  birthday_color: "#F89542",
  events: [],
  project_days: 365, // Days into future to project,
  subject_name: null, // Person's name (otherwise 'I')
  get_events: null, // Function to get events (e.g. via API resource)
};

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    visible: state.columns.popUp,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(grabEvents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
