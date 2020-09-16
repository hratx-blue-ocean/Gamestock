import React from "react";
import styled from "styled-components";
import { CardWrapper, Text, Thumbnail } from "../Core/CardView.jsx";

import {
  StyledInput,
  Wrapper,
  GlobalStyles,
  Title,
  WrapGrid,
  StyledButton,
  StyledForm,
} from "../Core/coreStyles.jsx";

const Card = ({ collections, items, prices }) => {
  if (items.data) {
    return (
      <div>
        {items.data.rows.map((item) => {
          return (
            <div key={item.id}>
              <CardWrapper>
                <Thumbnail src={item.thumbnail} />
                <Text>{item.title}</Text>
                <Text>{item.console}</Text>
                <Text>Condition</Text>
                <Text>Price</Text>
                <StyledButton>Delete</StyledButton>
              </CardWrapper>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Card;
