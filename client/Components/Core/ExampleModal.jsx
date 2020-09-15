import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalInner,
  Wrapper,
  Title,
  Form,
  Input,
  Freeze,
} from "./coreStyles.jsx";
import styled from "styled-components";

export default function ExampleModal() {
  const [modalState, setModalState] = useState(false);

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  //broken for now
  // const freeze = (modalState) => {
  //   const page = document.getElementsByTagName("body")[0];
  //   if (modalState) {
  //     page.style.overflow = "hidden";
  //     page.style.maxHeight = "100%";
  //     page.style.width = "100%";
  //     page.style.position = "fixed";
  //   } else {
  //     page.style.overflow = "auto";
  //     page.style.maxHeight = "auto";
  //     page.style.width = "auto";
  //     page.style.position = "relative";
  //   }
  // };

  //add custom styles here between backticks
  const ModalWrapper = styled(Wrapper)``;

  return (
    <div>
      <Modal modalState={modalState} onClick={() => toggleModalState()}>
        <ModalInner onClick={(e) => e.stopPropagation()}>
          <ModalWrapper>
            <Title>Modal Title</Title>
            <p>This is example Moadal Text</p>
            <Form>
              <Input placeholder="form entry"></Input>
              <Button>Submit</Button>
              <Button>Cancel</Button>
            </Form>
          </ModalWrapper>
        </ModalInner>
      </Modal>
      <Button onClick={() => toggleModalState()}>Open Modal</Button>
    </div>
  );
}
