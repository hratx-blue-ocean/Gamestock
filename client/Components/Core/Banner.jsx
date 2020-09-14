import React from "react";
import { Button, BannerWrapper } from "../Core/coreStyles.jsx";
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
