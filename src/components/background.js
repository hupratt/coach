import { useSelector, useDispatch } from "react-redux";
import React, { useRef, useEffect, useState } from "react";
import { grabQuoteOfTheDay } from "../actions/quote";

import "./background.css";

const heroArea = (children, author, quote, popUp) => {
  return (
    <React.Fragment>
      <div className="content">
        <div id="app"></div>
        <div className={popUp}>
          {/* <span className="content__pretitle">CWS Investment</span> */}

          <h2 className="content__title">Ascendency</h2>
          <div className="container">
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

function Background(props) {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);
  const author = useSelector((state) => state.quote.author);
  const quote = useSelector((state) => state.quote.quote);
  const visible = useSelector((state) => state.columns.popUp);
  const popUp = visible ? "content__title-wrap blur" : "content__title-wrap";

  useEffect(() => {
    dispatch(grabQuoteOfTheDay());
  }, []);
  useDidUpdate(() => {
    if (didMount) {
      setDidMount(true);
      setTimeout(() => {
        const script = document.createElement("script");
        script.async = false;
        script.src = "/js/init.js";
        document.body.appendChild(script);
      }, 1000);
    }
  });
  return heroArea(props.children, author, quote, popUp);
}

export default Background;
