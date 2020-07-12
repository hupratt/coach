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

  generate_events(cb) {
    cb(this.props.events || []);
  }

  componentDidMount() {
    this.props.fetchEvents();
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
    return (
      <div className={`container see-through ${blur}`}>
        <h2>2020</h2>
        <ReactLifeTimeline
          subject_name="Hugo"
          birthday={new Date("1990-04-17")}
          events={this.props.events}
          project_days={daysLeftEndOfYear(new Date("2020-01-01"), new Date())}
          show={this.props.show}
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

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    visible: state.columns.popUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(grabEvents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
