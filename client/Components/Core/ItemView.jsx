import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [priceData, setPriceData] = useState([]);
  const [itemCollectionData, setItemCollectionData] = useState({
    dates: [],
    prices: [],
    current_price: 59.99,
    comments: "we need this",
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

  const getDailyPrices = (itemID) => {
    axios
      .get("/prices/items", {
        params: {
          itemID: itemID,
        },
      })
      .then((priceData) => {
        const pricesAndDates = [[], []];
        priceData.data.rows.forEach((date) => {
          pricesAndDates[0].push(date.date.slice(0, 10));
          pricesAndDates[1].push(parseFloat(date.total_value.slice(1)));
        });
        setItemCollectionData({
          dates: [item.date_of_purchase.slice(0, 10)].concat(pricesAndDates[0]),
          prices: [parseFloat(item.starting_price.slice(1))].concat(
            pricesAndDates[1]
          ),
          current_price: pricesAndDates[1][pricesAndDates[1].length - 1],
        });
        console.log(itemCollectionData);
      })
      .catch((err) => {
        console.log("Error getting price data: ", err);
      });
  };

  let { date_of_purchase, current_price, comments } = itemCollectionData;

  return (
    <div>
      <Modal modalState={modalState} onClick={() => freeze(modalState)}>
        <ModalInner onClick={(e) => e.stopPropagation()}>
          <ModalWrapper>
            <Title>{item.title}</Title>
            <PriceGraph
              dates={itemCollectionData.dates}
              prices={itemCollectionData.prices}
            />
            <Centered>{/* <StyledImg>{item.thumbnail}</StyledImg> */}</Centered>
            <MoveLeft>
              <p>Console: {item.console}</p>
              <p>Condition: {item.condition}</p>
              <p>Date of Purchase: {item.date_of_purchase.slice(0, 10)}</p>
              <p>Starting Price: {item.starting_price}</p>
              <p>Current Price: ${current_price}</p>
              <p>Tradeable? {item.tradeable === "Tradeable" ? "Yes" : "No"}</p>
              <p>Comments: {item.comments}</p>
            </MoveLeft>
            <Centered>
              <StyledButton>Delete Item From Collection</StyledButton>
            </Centered>
          </ModalWrapper>
        </ModalInner>
      </Modal>
      <StyledButton
        onClick={() => {
          getDailyPrices(item.id);
          console.log("CLICKED", item.id);
          freeze(modalState);
        }}
      >
        View Item
      </StyledButton>
    </div>
  );
}
