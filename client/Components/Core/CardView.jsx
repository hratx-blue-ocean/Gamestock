import React from "react";
import { StyledButton, Wrapper } from "../Core/coreStyles.jsx";
import styled from "styled-components";

export const Thumbnail = styled.img`
  margin-left: 50px;
  margin: auto;
  padding: 5px 0px;
  &:hover {
    cursor: pointer;
  }
  max-height: 50px;
  max-width: 50px;
`;

export const Text = styled.p`
  padding: 0px;
  margin: auto;
  &:hover {
    color: #54f3f7;
    cursor: pointer;
  }
`;

export const CardWrapper = styled(Wrapper)`
  margin-top: 10px;
  display: flex;
  background: #2d1c7b;
  color: #54f3f7;
  border-radius: 10px;
  border: 2px solid #eb29fd;
  flex-wrap: wrap;
  justify-content: space-between;
  align-item: center;
  box-sizing: border-box;
`;

export default function CardView({ item }) {
  return (
    <CardWrapper>
<<<<<<< HEAD
      <Thumbnail src={item.thumbnail}></Thumbnail>
=======
      <Thumbnail>{<img src={item.thumbnail} />}</Thumbnail>
>>>>>>> working on accessing items in collection
      <Text>Game Title</Text>
      <Text>Game Console</Text>
      <Text>Condition</Text>
      <Text>Price</Text>
      <StyledButton>Edit</StyledButton>
      <StyledButton>Delete</StyledButton>
    </CardWrapper>
  );
}
