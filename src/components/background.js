import React, { useRef, useEffect, useState } from "react";
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

const useDidUpdate = (callback, deps) => {
  const hasMount = useRef(false);

  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
  }, deps);
};

const Background = (props) => {
  const [didMount, setDidMount] = useState(false);
  useDidUpdate(() => {
    if (didMount) {
      setTimeout(() => {
        const script = document.createElement("script");
        script.async = false;
        script.src = "/js/init.js";
        document.body.appendChild(script);
        setDidMount(true);
      }, 1000);
    }
  });
  return heroArea(props.children);
};

export default Background;
