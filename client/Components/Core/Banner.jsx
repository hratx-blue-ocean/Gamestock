import React from "react";
import { Button, Wrapper } from "../Core/coreStyles.jsx";
import styled from "styled-components";

const Avatar = styled.p`
  margin-left: 50px;
  margin: auto;
  padding: 20px 0px;
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.p`
  padding: 0px;
  margin: auto;
  &:hover {
    color: skyblue;
    cursor: pointer;
  }
`;

export const BannerWrapper = styled(Wrapper)`
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

export default function Banner() {
  return (
    <BannerWrapper>
      <Avatar>Avatar goes here</Avatar>
      <Text>Username</Text>
      <Text>Collection Size</Text>
      <Text>Collection Value</Text>
      <Button>See Collection</Button>
    </BannerWrapper>
  );
}
