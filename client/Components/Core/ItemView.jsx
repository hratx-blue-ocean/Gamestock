import React, { useState } from "react";
import {
  StyledButton,
  Modal,
  ModalInner,
  Wrapper,
  Title,
  StyledForm,
  StyledInput,
  Centered,
} from "./coreStyles.jsx";
import styled from "styled-components";
import PriceGraph from "../PriceGraph/PriceGraph.jsx";

//styles
const ModalWrapper = styled(Wrapper)`
  background-color: #1e1e1e;
`;
const StyledImg = styled.img`
  background-color: #1e1e1e;
  max-height: 400px;
  max-width: 200px;
  padding: 30px;
`;

const MoveLeft = styled.div`
  margin-left: 50px;
`;

export default function ItemView({ item }) {
  const [modalState, setModalState] = useState(false);
  const [itemCollectionData, setItemCollectionData] = useState({
    title: "Spider-Man Miles Morales",
    console_type: "PS5",
    condition: "new",
    DOP: "8/1/2020",
    starting_price: 59.99,
    current_price: 699.0,
    tradeable: "yes",
    comments: "best game ever",
  });

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  const freeze = (modalState) => {
    const page = document.getElementsByTagName("body")[0];
    if (!modalState) {
      page.classList.add("freeze");
      toggleModalState();
    } else {
      page.classList.remove("freeze");
      toggleModalState();
    }
  };

  let {
    title,
    console_type,
    condition,
    DOP,
    starting_price,
    current_price,
    tradeable,
    comments,
  } = itemCollectionData;

  return (
    <div>
      <Modal modalState={modalState} onClick={() => freeze(modalState)}>
        <ModalInner onClick={(e) => e.stopPropagation()}>
          <ModalWrapper>
            <Title>{title}</Title>
            <Centered>{/* <StyledImg>{item.thumbnail}</StyledImg> */}</Centered>
            <MoveLeft>
              <p>Console: {console_type}</p>
              <p>Condition: {condition}</p>
              <p>Date of Purchase: {DOP}</p>
              <p>Starting Price: ${starting_price}</p>
              <p>Current Price: ${current_price}</p>
              <p>Tradeable? {tradeable}</p>
              <p>Comments: {comments}</p>
            </MoveLeft>
          </ModalWrapper>
        </ModalInner>
      </Modal>
      <PriceGraph />
      <StyledButton onClick={() => freeze(modalState)}>View Item</StyledButton>
    </div>
  );
}
