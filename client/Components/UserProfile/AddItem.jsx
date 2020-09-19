import React, { useState } from "react";
import AddItemForm from "./AddItemForm.jsx";
import {
  StyledButton,
  Modal,
  ModalInner,
  Wrapper,
  Title,
} from "../Core/coreStyles.jsx";
import styled from "styled-components";

const ModalWrapper = styled(Wrapper)``;

const ModalBody = styled(ModalInner)`
  width: 800px;
`;

export default function AddItem(props) {
  const [modalState, setModalState] = useState(false);

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  return (
    <div>
      <Modal modalState={modalState} onClick={() => toggleModalState()}>
        <ModalBody onClick={(e) => e.stopPropagation()}>
          <ModalWrapper>
            <Title>Add Item To Your Collection</Title>
            <AddItemForm
              toggleModalState={toggleModalState}
              userId={props.userId}
              setCollection={props.setCollection}
              collection={props.collection}
              exitModal={() => toggleModalState()}
            />
          </ModalWrapper>
        </ModalBody>
      </Modal>
      <StyledButton onClick={() => toggleModalState()}>
        Add Item To Your Collection
      </StyledButton>
    </div>
  );
}
