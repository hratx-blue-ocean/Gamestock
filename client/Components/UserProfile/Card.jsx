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

const Card = ({ collection }) => {
  return (
    <div>
      {/* {collection.rows.map((item) => {
        return (
          <div key={item.id}>
            <CardWrapper>
              <Thumbnail
              // src={item.thumbnail}
              />
              <Text>{item.title}</Text>
              <Text>{item.console}</Text>
              <Text>{item.condition}</Text>
              <Text>{item.starting_price}</Text>
              <Text>{item.tradeable ? "Yes" : "No"}</Text>
              <StyledButton>Delete</StyledButton>
            </CardWrapper>
          </div>
        );
      })} */}
    </div>
  );
};

export default Card;
