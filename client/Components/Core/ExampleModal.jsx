import React, { useState } from "react";
import {
  StyledButton,
  Modal,
  ModalInner,
  Wrapper,
  Title,
  StyledForm,
  StyledInput,
} from "./coreStyles.jsx";
import styled from "styled-components";

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

export default function ExampleModal() {
  const [modalState, setModalState] = useState(false);

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  return (
    <div>
      <Modal modalState={modalState} onClick={() => freeze(modalState)}>
        <ModalInner onClick={(e) => e.stopPropagation()}>
          <ModalWrapper>
            <Title>Modal Title</Title>
            <p>This is example Moadal Text</p>
            <StyledForm>
              <StyledInput placeholder="form entry"></StyledInput>
              <StyledButton>Submit</StyledButton>
              <StyledButton>Cancel</StyledButton>
            </StyledForm>
          </ModalWrapper>
        </ModalInner>
      </Modal>
      <Button onClick={() => freeze(modalState)}>Open Modal</Button>
    </div>
  );
}
