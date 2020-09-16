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
  // edit and delete button

  // const CardGrid = styled(WrapGrid)`
  //   grid-template-columns: 50px 100px 100px 100px 100px auto 75px 75px 75px 75px 75px;
  //   margin-top: 30px;
  //   margin-bottom: 20px;
  // `;

  // columns needed on each card: thumbnail, title, console, condition, price, edit button, delete button
  // items.data

  //   ? console.log("ITEMS PROP: ", items.data.rows)
  //   : console.log("Nothing yet");

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
                <StyledButton>Edit</StyledButton>
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
