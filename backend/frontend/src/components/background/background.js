import { useSelector, useDispatch } from "react-redux";
import React, { useRef, useEffect, useState } from "react";
import { grabQuoteOfTheDay } from "../../actions/quote";
import { toggleBackground } from "../../actions/board";
import { useDidUpdate } from "../utils";

import "./background.css";

const heroArea = (children, author, quote, blur, superblur) => {
  const vis = blur ? "hidden" : "inherit";
  return (
    <React.Fragment>
      <div className="content">
        <div id="app" style={{ visibility: vis }}></div>
        <div className="content__title-wrap">
          {/* <span className="content__pretitle"></span> */}

          <h2 className={`content__title ${blur}`}>Coach</h2>
          <div className={`container ${blur}`}>
            <span className="content__pretitle">
              {quote} - {author}
            </span>
          </div>
          {/* <a className="content__link" href="#">
            Learn more
          </a> */}
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

function Background(props) {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);
  const author = useSelector((state) => state.quote.author);
  const quote = useSelector((state) => state.quote.quote);
  const visible = useSelector((state) => state.columns.popUp);
  const backgroundLoaded = useSelector(
    (state) => state.columns.backgroundLoaded
  );
  const blur = visible ? "blur" : "";
  const superblur = visible ? "superblur" : "";

  // component will unmount
  useEffect(() => {
    return () => {
      var elem = document.getElementById("road-background");
      elem && elem.remove();
    };
  }, []);
  // component did update
  useDidUpdate(() => {
    if (!didMount) {
      setDidMount(true);
      dispatch(toggleBackground());
      setTimeout(() => {
        const script = document.createElement("script");
        script.async = "async";
        script.id = "road-background";
        script.src = "static/frontend/js/init.js";
        document.body.appendChild(script);
      }, 1000);
    }
  });

  return heroArea(props.children, author, quote, blur, superblur);
}

export default Background;
