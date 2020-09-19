import React from "react";
import { StyledButton, Wrapper } from "../Core/coreStyles.jsx";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AvatarWrapper = styled.img`
  ${"" /* grid-column-start: 2; */}
  margin-left: 50px;
  margin: auto;
  padding: 5px 0px;
  &:hover {
    cursor: pointer;
  }
  border-radius: 50%;
  max-height: 50px;
  max-width: 50px;
`;

const Text = styled.p`
  padding: 0px;
  margin: auto;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const BannerWrapper = styled(Wrapper)`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 50px repeat(auto-fill, 215px);
  background: #2d1c7b;
  color: #54f3f7;
  border-radius: 10px;
  border: 2px solid #eb29fd;
  align-items: center;
  box-sizing: border-box;
`;

export default function Banner(props) {
  const {
    rank,
    username,
    collectionSize,
    collectionValue,
    avatar,
    setCollectionOwnerName,
  } = props;

  return (
    <BannerWrapper>
      <Text>{rank}</Text>
      <AvatarWrapper src={avatar}></AvatarWrapper>
      <Text>{username}</Text>
      <Text>{collectionSize}</Text>
      <Text>{collectionValue}</Text>
      <StyledLink to={`/profile/${username}`}>
        <StyledButton
          onClick={() => {
            setCollectionOwnerName(username);
          }}
        >
          See Collection
        </StyledButton>
      </StyledLink>
    </BannerWrapper>
  );
}
