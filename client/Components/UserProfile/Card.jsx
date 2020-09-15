import React from "react";
import styled from "styled-components";
import {
  Input,
  Wrapper,
  GlobalStyles,
  Title,
  WrapGrid,
  Button,
  Form,
} from "../Core/coreStyles.jsx";

const Card = ({ users, items, prices }) => {
  // edit and delete button

  const CardGrid = styled(WrapGrid)`
    grid-template-columns: 50px 100px 100px 100px 100px auto 75px 75px 75px 75px 75px;
    margin-top: 30px;
    margin-bottom: 20px;
  `;

  // columns needed on each card: thumbnail, title, console, condition, price, edit button, delete button
  items.data
    ? console.log("ITEMS PROP: ", items.data.rows)
    : console.log("Nothing yet");

  return (
    <div>
      {items.data.rows.map((item) => {
        return (
          <Wrapper>
            <CardGrid>{item.title}</CardGrid>
          </Wrapper>
        );
      })}
    </div>
  );
};

export default Card;
