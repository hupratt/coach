import React, { Component } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

class PopUpModal extends Component {
  render() {
    const { open, close, dimmer } = this.props;

    return (
      <div>
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
      </div>
    );
  }
}

export default PopUpModal;
