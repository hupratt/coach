import React from "react";
import "./background.css";

const heroArea = (children) => {
  return (
    <React.Fragment>
      <div className="content">
        <div id="app"></div>
        <div className="content__title-wrap">
          {/* <span className="content__pretitle">CWS Investment</span> */}

          <h2 className="content__title">Ascendency</h2>
          {/* <a className="content__link" href="#">
            Learn more
          </a> */}
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

class Background extends React.Component {
  constructor(props) {
    super(props);
    this.state = { heroArea: null, scriptLoaded: false, heroLoaded: false };
  }

  componentDidUpdate() {
    if (!this.props.loading && !this.state.scriptLoaded) {
      this.setState(
        {
          heroArea: heroArea(this.props.children),
          scriptLoaded: true,
        },
        () => {
          setTimeout(() => {
            const script = document.createElement("script");
            script.async = false;
            script.src = "/js/init.js";
            document.body.appendChild(script);
          }, 1000);
        }
      );
    }
  }
  render() {
    return <React.Fragment>{this.state.heroArea}</React.Fragment>;
  }
}

export default Background;
