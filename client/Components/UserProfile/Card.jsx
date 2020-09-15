import React from "react";
import CollectionList from "./CollectionList.jsx";
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
  // items.data ? console.log("ITEMS PROP: ", items.data.rows) : console.log("[]");

  return (
    <div>
      <Wrapper>
        <CardGrid>
          <ul>
            {items.data.rows.map((item) => {
              return <li key={item.id}>{item.id}</li>;
            })}
            ;
          </ul>
        </CardGrid>
      </Wrapper>
    </div>
  );
};

export default Card;
