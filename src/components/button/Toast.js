import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import { CSSTransition } from "react-transition-group";
import "./Toast.css";

const Toast = ({ error, header, content, positive }) => {
  const [visible, setVisible] = useState(true);
  return (
    <CSSTransition
      in={visible}
      classNames="fadeout"
      unmountOnExit
      timeout={300}
    >
      <Message
        error={error}
        onDismiss={() => setVisible(!visible)}
        header={header}
        content={content}
        positive={positive}
      />
    </CSSTransition>
  );
};

export default Toast;
