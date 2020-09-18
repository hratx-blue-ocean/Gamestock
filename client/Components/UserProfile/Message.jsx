
import React, { useState } from "react";
import {
  StyledButton,
  Modal,
  ModalInner,
  Wrapper,
  Title,
  StyledForm,
  StyledInput,
} from "../Core/coreStyles.jsx";
import styled from "styled-components";


//add custom styles here between backticks
const ModalWrapper = styled(Wrapper)``;

export default function Message(props) {
  const [modalState, setModalState] = useState(false);

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  return (
    <div>
      <Modal modalState={modalState} onClick={() => toggleModalState()}>
        <ModalInner onClick={(e) => e.stopPropagation()}>
          <ModalWrapper>
            <Title>{props.name}</Title>
          </ModalWrapper>
        </ModalInner>
      </Modal>
      <StyledButton onClick={() => toggleModalState()}>
        Message
      </StyledButton>
    </div>
  );
}
