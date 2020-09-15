import React from "react";
import Card from "./Card.jsx";
import {
  Input,
  Wrapper,
  GlobalStyles,
  Title,
  WrapGrid,
  Button,
  Form,
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
