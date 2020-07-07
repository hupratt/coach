import React, { useState, useEffect } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../actions/actionTypes";

const PopUpModal = ({ open, close, dimmer }) => {
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
      <Modal dimmer={dimmer} open={open} onClose={close}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
          />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={close}>
            Nope
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yep, that's me"
            onClick={close}
          />
        </Modal.Actions>
      </Modal>
    </CSSTransition>
  );
};

export default PopUpModal;
