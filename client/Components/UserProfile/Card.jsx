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

const CardText = styled(Text)`
  font-size: 10px;
`;

const Card = ({ collection, currentCards }) => {
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
                <CardText>{item.title}</CardText>
                <CardText>{item.console}</CardText>
                <CardText>{item.condition}</CardText>
                <CardText>{item.starting_price}</CardText>
                <CardText>{item.tradeable ? "Tradeable" : ""}</CardText>
                <ItemView item={item} />
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
