import { Message } from "semantic-ui-react";
import { CSSTransition } from "react-transition-group";
import "./Toast.css";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../actions/actionTypes";
import React, { useState, useEffect } from "react";

const Toast = ({ error, header, content, positive }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => dispatch({ type: actionTypes.RESET_FAIL }), 10000);
  }, []);

  return (
    <CSSTransition
      in={visible}
      classNames="fadeout"
      unmountOnExit
      timeout={500}
    >
      {/* <CSSTransition in={true} classNames="fadein" appear timeout={300}> */}
      <Message
        error={error}
        onDismiss={() => setVisible(!visible)}
        header={header}
        content={content}
        positive={positive}
      />
    </CSSTransition>
    // </CSSTransition>
  );
};

export default Toast;
