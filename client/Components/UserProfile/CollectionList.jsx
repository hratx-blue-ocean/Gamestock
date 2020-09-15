import React from "react";
import Card from "./Card.jsx";
import {
  StyledInput,
  Wrapper,
  GlobalStyles,
  Title,
  WrapGrid,
  StyledButton,
  StyledForm,
} from "../Core/coreStyles.jsx";

const CollectionList = ({ items, prices }) => {
  return (
    <div>
      <Wrapper>
        <Title>User Collection</Title>
        <Card items={items} prices={prices} />
      </Wrapper>
    </div>
  );
};

export default CollectionList;
