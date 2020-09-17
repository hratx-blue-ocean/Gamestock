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
  console.log("CARD COLLECTION: ", collection);
  if (collection.length) {
    return (
      <div>
        {collection.map((item, idx) => {
          return (
            <div key={idx}>
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
        })}
      </div>
    );
  } else {
    return (
      <div>
        <Text>Well, shit.</Text>
      </div>
    );
  }
};

export default Card;
