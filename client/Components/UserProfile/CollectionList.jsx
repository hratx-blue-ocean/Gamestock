import React from "react";
import Card from "./Card.jsx";
import Print from "./Print.jsx";
import DisplayItems from "./DisplayItems.jsx";
import AddItem from "./AddItem.jsx";
import styled from "styled-components";
import {
  StyledInput,
  Wrapper,
  GlobalStyles,
  Title,
  WrapGrid,
  StyledButton,
  StyledForm,
} from "../Core/coreStyles.jsx";

//style extensions
const UserProfGrid = styled(WrapGrid)`
  grid-template-columns: 100px 100px 100px 5px 5px auto 75px 75px 115px 75px 75px 75px 100px;
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

const CollectionList = ({ collection, currentCards }) => {
  return (
    <div>
      {collection[0] && (
        <Wrapper>
          <Title>{`${collection[0].username}'s Collection`}</Title>
          <DisplayItems collection={collection} />
          <UserProfGrid>
            <GameSearchForm onSubmit={() => {}}>
              <StyledInput
                placeholder="search games in collection"
                type="text"
                value=""
                onChange={() => {}}
              ></StyledInput>
              <StyledButton>Search</StyledButton>
            </GameSearchForm>
            <LeftButton id="sortByTitle" onClick={() => {}}>
              Title
            </LeftButton>
            <MiddleButton id="sortByPrice" onClick={() => {}}>
              Price
            </MiddleButton>
            <MiddleButton id="sortByCondition" onClick={() => {}}>
              Condition
            </MiddleButton>
            <MiddleButton id="sortByPC">PC</MiddleButton>
            <MiddleButton id="sortBySony">Sony</MiddleButton>
            <MiddleButton id="sortByXbox">Xbox</MiddleButton>
            <RightButton id="sortByNintendo">Nintendo</RightButton>
          </UserProfGrid>
          <Print />
          <AddItem />
          <Card collection={collection} currentCards={currentCards} />
        </Wrapper>
      )}
    </div>
  );
};

export default CollectionList;
