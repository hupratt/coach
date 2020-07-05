import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import { CSSTransition } from "react-transition-group";
import "./Toast.css";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../actions/actionTypes";

const Toast = ({ error, header, content, positive }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(true);
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
        onDismiss={() => {
          dispatch({ type: actionTypes.RESET_FAIL });
          setVisible(!visible);
        }}
        header={header}
        content={content}
        positive={positive}
      />
    </CSSTransition>
    // </CSSTransition>
  );
};

export default Toast;
