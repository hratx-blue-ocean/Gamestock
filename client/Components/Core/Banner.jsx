import React from "react";
import { StyledButton, Wrapper } from "../Core/coreStyles.jsx";
import styled from "styled-components";

const AvatarWrapper = styled.img`
  margin-left: 50px;
  margin: auto;
  padding: 20px 0px;
  &:hover {
    cursor: pointer;
  }
  border-radius: 50%;
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

export default function Banner({
  username,
  collectionSize,
  collectionValue,
  avatar,
}) {
  return (
    <BannerWrapper>
      <AvatarWrapper src={avatar}></AvatarWrapper>
      <Text>{username}</Text>
      <Text>{collectionSize}</Text>
      <Text>{collectionValue}</Text>
      <StyledButton>See Collection</StyledButton>
    </BannerWrapper>
  );
}
