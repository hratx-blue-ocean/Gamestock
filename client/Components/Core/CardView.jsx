import React from "react";
import { Button, Wrapper } from "../Core/coreStyles.jsx";
import styled from "styled-components";

export const Thumbnail = styled.p`
  margin-left: 50px;
  margin: auto;
  padding: 20px 0px;
  &:hover {
    cursor: pointer;
  }
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

export default function CardView() {
  return (
    <CardWrapper>
      <Thumbnail>{<img src={item.thumbnail} />}</Thumbnail>
      <Text>Game Title</Text>
      <Text>Game Console</Text>
      <Text>Condition</Text>
      <Text>Price</Text>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </CardWrapper>
  );
}
