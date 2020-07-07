// fork from : https://github.com/onejgordon/react-life-timeline

import React from "react";
import ReactTooltip from "react-tooltip";
import PopUpModal from "../components/modal/PopUpModal";

export default class ReactLifeTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      lookup: {},
      loaded: false,
      today: new Date(),
      open: false,
    };
  }

  componentDidMount() {
    if (this.props.events.length > 0) this.got_events(this.props.events);
    else if (this.props.get_events !== null)
      this.props.get_events(this.got_events.bind(this));
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.get_events === null &&
      nextProps.events.length !== this.state.events.length
    )
      this.got_events(nextProps.events);
  }

  event_end_date(e) {
    if (e.date_end) return new Date(e.date_end);
    else return new Date(e.date_start);
  }

  got_events(events) {
    if (events.length > 0) {
      let latest_event = events.sort((e1, e2) => {
        let e1ref = this.event_end_date(e1);
        let e2ref = this.event_end_date(e2);
        if (e2ref > e1ref) return 1;
        else if (e2ref < e1ref) return -1;
        else return 0;
      })[0];
    }
    this.setState({
      events: events,
      loaded: true,
      lookup: this.generate_lookup(),
    });
  }

  print_date(date) {
    var d = date.getDate();
    var month = date.getMonth() + 1;
    var day = d < 10 ? "0" + d : "" + d;
    if (month < 10) month = "0" + month;
    return date.getFullYear() + "-" + month + "-" + day;
  }

  generate_lookup() {
    // Generate lookup (event list for each date, by ISO date)
    let lookup = {};
    this.all_weeks((week_start, week_end) => {
      lookup[this.print_date(week_start)] = this.get_events_in_week(
        week_start,
        week_end
      );
    });
    // this.setState({ lookup }, () => {
    //   ReactTooltip.rebuild();
    // });
    return lookup;
  }

  single_event(e) {
    return (
      (e.single || !e.date_end || e.date_start === e.date_end) && !e.ongoing
    );
  }

  get_events_in_week(week_start, week_end) {
    let { today } = this.state;
    let { birthday, subject_name, events } = this.props;
    let this_week = today >= week_start && today <= week_end;
    let color = null;
    let single = false; // Has single events
    let _events = events.filter((e) => {
      let estart = new Date(e.date_start);
      let eend = new Date(e.date_end);
      if (e.ongoing) eend = new Date();
      let start_in_week = estart >= week_start && estart < week_end;
      let end_in_week = eend >= week_start && eend < week_end;
      let event_spans_week = estart <= week_start && eend >= week_end;
      let in_week = start_in_week || end_in_week || event_spans_week;
      if (in_week) {
        if (e.color) color = e.color;
        if (this.single_event(e)) single = true;
      }
      return in_week;
    });
    if (birthday) {
      let age = 0;
      let bd_in_week = false;
      while (week_start < week_end) {
        if (
          week_start.getMonth() === birthday.getMonth() &&
          week_start.getDate() === birthday.getDate()
        ) {
          bd_in_week = true;
          age = week_start.getFullYear() - birthday.getFullYear();
          break;
        }
        week_start.setDate(week_start.getDate() + 1);
      }
      if (bd_in_week) {
        color = this.props.birthday_color;
        let me = subject_name === null;
        let title;
        let subj = me ? "I" : subject_name;
        if (age === 0) {
          let verb = me ? "am" : "is";
          title = `${subj} ${verb} born!`;
        } else {
          let verb = me ? "turn" : "turns";
          title = `${subj} ${verb} ${age} on ${birthday.getMonth() +
            1}/${birthday.getDate()}`;
        }
        _events.push({ title: title, color: color });
      }
    }
    // if (this_week) {
    //   color = "white";
    //   _events.push({ title: "This week", color: color });
    // }
    return {
      events: _events,
      color: color,
      single: single,
    };
  }

  all_weeks(fn) {
    let cursor = new Date(2019, 12, 29);
    let weekCounter = 1;
    while (weekCounter < 53) {
      let d = new Date(cursor.getTime());
      cursor.setDate(cursor.getDate() + 7);
      fn(d, new Date(cursor.getTime()), weekCounter);
      weekCounter += 1;
    }
  }
  show = (dimmer) => {
    this.setState((prevState) => {
      return { ...prevState, dimmer, open: true };
    });
  };
  close = () =>
    this.setState((prevState) => {
      return { ...prevState, open: false };
    });
  render_week(date_start, date_end, weekCounter) {
    let date = this.print_date(date_start);
    let { today } = this.state;
    let res = this.state.lookup[date];
    let _single;
    let events = [];
    let color;
    let single = false;
    res && ({ events, color, single } = res);
    let future = date_start > today;
    let st = {};
    if (events.length > 0) st.backgroundColor = color || "#1AA9FF";
    let stringCopy = 0;
    stringCopy += 1;
    let tips = [`Week ${weekCounter}`].concat(
      events.map((e) => {
        return e.title;
      })
    );
    let cls = "week";
    if (future) cls += " future";
    if (single) _single = <span className="singleEvents"></span>;
    return (
      <React.Fragment key={weekCounter}>
        <ReactTooltip
          place="top"
          effect="solid"
          delayHide={1000}
          data-event="click"
        />
        <div
          className={cls}
          key={date}
          style={st}
          data-tip={tips.join(", ")}
          onClick={() => {
            this.show();
          }}
        >
          {_single}
        </div>
      </React.Fragment>
    );
  }

  render_all_weeks() {
    let weeks = [];

    this.all_weeks((start, end, weekCounter) => {
      weeks.push(this.render_week(start, end, weekCounter));
    });
    return weeks;
  }

  render() {
    return (
      <>
        <PopUpModal
          open={this.state.open}
          close={this.close}
          dimmer="blurring"
        />
        <div className="LifeTimeline">{this.render_all_weeks()}</div>
      </>
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
