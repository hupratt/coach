import { useSelector, useDispatch } from "react-redux";
import React, { useRef, useEffect, useState } from "react";
import { grabQuoteOfTheDay } from "../../actions/quote";

import "./background.css";

const heroArea = (children, author, quote, blur, superblur) => {
  console.log("content blur");
  return (
    <React.Fragment>
      <div className="content">
        <div id="app" className={superblur}></div>
        <div className="content__title-wrap">
          {/* <span className="content__pretitle">CWS Investment</span> */}

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
  const blur = visible ? "blur" : "";
  const superblur = visible ? "superblur" : "";

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
  return heroArea(props.children, author, quote, blur, superblur);
}

export default Background;
