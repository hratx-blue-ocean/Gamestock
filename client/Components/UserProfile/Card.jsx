import React from "react";
import styled from "styled-components";
import { CardWrapper, Text, Thumbnail } from "../Core/CardView.jsx";

import {
  Input,
  Wrapper,
  GlobalStyles,
  Title,
  WrapGrid,
  Button,
  Form,
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
                <Thumbnail>{<img src={item.thumbnail} />}</Thumbnail>
                <Text>{item.title}</Text>
                <Text>{item.console}</Text>
                <Text>Condition</Text>
                <Text>Price</Text>
                <Button>Edit</Button>
                <Button>Delete</Button>
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
