import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import Print from "./Print.jsx";
import DisplayItems from "./DisplayItems.jsx";
import AddItem from "./AddItem.jsx";
import styled from "styled-components";
import Paginator from "./Paginator.jsx";
import PriceGraph from "../PriceGraph/PriceGraph.jsx";
import axios from "axios";
import { CardWrapper, Text, Thumbnail } from "../Core/CardView.jsx";
import {
  StyledInput,
  StyledSelect,
  Wrapper,
  Title,
  WrapGrid,
  StyledButton,
  StyledForm,
} from "../Core/coreStyles.jsx";

//style extensions
const UserProfGrid = styled(WrapGrid)`
  grid-template-columns: 100px 100px 100px 5px 5px auto 75px 75px 115px 120px;
  margin-top: 30px;
  margin-bottom: 20px;
`;
const GameSearchForm = styled(StyledForm)`
  grid-column-start: 1;
  display: flex;
`;
const LeftButton = styled(StyledButton)`
  grid-column-start: 7;
  border-radius: 10px 0px 0px 10px;
  margin: 0;
  border: 1px solid;
`;
const MiddleButton = styled(StyledButton)`
  border-radius: 0px;
  margin: 0;
  border: 1px solid;
`;
const RightButton = styled(StyledButton)`
  border-radius: 0px 10px 10px 0px;
  margin: 0;
  border: 1px solid;
`;

const UserProfSelect = styled(StyledSelect)`
  grid-column-start: 12;
`;

const CollectionList = ({
  collection,
  currentCards,
  userId,
  cardsPerPage,
  handlePageClick,
  sortByTitle,
  sortByPrice,
  sortByCondition,
  sortByTradeable,
  getCollectionByConsole,
  getAllConsoles,
  consoles,
}) => {
  const [userCollectionData, setUserCollectionData] = useState([]);

  useEffect(() => {
    // sort by value on page load
    // console.log("collection: ", collection);
    if (collection[0]) {
      getDailyCollectionPrice(collection[0].username);
    }
    getAllConsoles();
  }, [collection]);

  const getDailyCollectionPrice = (username) => {
    axios
      .get("/userCollectionValue", {
        params: {
          username: username,
        },
      })
      .then((userCollectionPrices) => {
        //console.log(userCollectionPrices);
        const pricesAndDates = [[], []];
        userCollectionPrices.data.rows.map((collection) => {
          pricesAndDates[0].push(collection.date.slice(0, 10));
          pricesAndDates[1].push(
            parseFloat(collection.total_value.slice(1).replace(/,/g, ""))
          );
        });
        setUserCollectionData(() => pricesAndDates);
      })
      .catch((err) => {
        console.log("Error getting user collection data: ", err);
      });
  };

  return (
    <div>
      {collection[0] && (
        <Wrapper>
          <Title>{`${collection[0].username}'s Collection`}</Title>
          <DisplayItems collection={collection} />
          <PriceGraph
            dates={userCollectionData[0]}
            prices={userCollectionData[1]}
          />
          <UserProfGrid>
            {/* <GameSearchForm onSubmit={() => {}}>
              <StyledInput
                placeholder="search games in collection"
                type="text"
                value=""
                onChange={() => {}}
              ></StyledInput>
              <StyledButton>Search</StyledButton>
            </GameSearchForm> */}
            {/* <Text>Sort by: </Text> */}
            <LeftButton
              id="sortByTitle"
              onClick={() => {
                sortByTitle();
              }}
            >
              Title
            </LeftButton>
            <MiddleButton
              id="sortByPrice"
              onClick={() => {
                sortByPrice();
              }}
            >
              Price
            </MiddleButton>
            <MiddleButton
              id="sortByCondition"
              onClick={() => sortByCondition()}
            >
              Condition
            </MiddleButton>
            <RightButton
              id="sortByTrade"
              onClick={() => {
                sortByTradeable();
              }}
            >
              Tradeable
            </RightButton>
            <UserProfSelect
              onChange={(e) => getCollectionByConsole(e)}
              defaultValue="select console"
            >
              <option disabled>select console</option>
              {consoles.map((console, idx) => (
                <option key={idx} id={console.console}>
                  {console.console}
                </option>
              ))}
            </UserProfSelect>
          </UserProfGrid>
          {/* <Print /> */}
          <AddItem userId={userId} />
          <Card collection={collection} currentCards={currentCards} />
          <Paginator
            collection={collection}
            cardsPerPage={cardsPerPage}
            handlePageClick={handlePageClick}
          />
        </Wrapper>
      )}
    </div>
  );
};

export default CollectionList;
