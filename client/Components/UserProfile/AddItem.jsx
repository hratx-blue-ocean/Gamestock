import React, { useState } from "react";
import AddItemForm from "./AddItemForm.jsx";
import {
  AddItemGrid,
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

const ItemGrid = styled(AddItemGrid)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;
const LeftButton = styled(StyledButton)`
  border-radius: 10px 0px 0px 10px;
  margin: 0;
  border: 1px solid;
`;
const RightButton = styled(StyledButton)`
  border-radius: 0px 10px 10px 0px;
  margin: 0;
  border: 1px solid;
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
              userId={props.userId}
              exitModal={() => toggleModalState()}
            />
          </ModalWrapper>
        </ModalBody>
      </Modal>
      <ItemGrid>
        <LeftButton onClick={() => toggleModalState()}>
          Add Item To Your Collection
        </LeftButton>
        <RightButton onClick={() => window.print()} type="button">
          Print Collection
        </RightButton>
      </ItemGrid>
      {/* <StyledButton onClick={() => toggleModalState()}>
        Add Item To Your Collection
      </StyledButton> */}
    </div>
  );
}
