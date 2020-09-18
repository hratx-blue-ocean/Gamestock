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
import ItemView from "../Core/ItemView.jsx";

const Card = ({ collection, currentCards }) => {
  console.log("CARD COLLECTION: ", collection);
  if (collection.length) {
    return (
      <div>
        {currentCards.map((item, idx) => {
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
                <Text>{item.tradeable ? "Tradeable" : ""}</Text>
                <ItemView item={item} />
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
        <Text>ERROR</Text>
      </div>
    );
  }
};

export default Card;
