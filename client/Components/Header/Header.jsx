import React, { useState, useEffect } from "react";
import { StyledButton, Wrapper, Title } from "../Core/coreStyles.jsx";
import styled from "styled-components";
import SignupLogin from "../SignupLogin/SignupLogin.jsx";
import { Link } from "react-router-dom";

const BannerWrapper = styled(Wrapper)`
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

const AvatarWrapper = styled.img`
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

const Logo = styled.p`
  font-size: 60px;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: #54f3f7;
  margin-left: 50px;
  margin-right: 200px;
`;

const Thumbnail = styled.img``;

const Header = ({ loggedIn, setLoggedIn }) => {
  return (
    <>
      {loggedIn.loggedIn ? (
        <>
          <BannerWrapper>
            <StyledLink to={"/"}>
              <Logo>Gamestock</Logo>
            </StyledLink>
            <AvatarWrapper src="https://s3.amazonaws.com/uifaces/faces/twitter/timmillwood/128.jpg"></AvatarWrapper>
            <StyledButton>Username</StyledButton>
          </BannerWrapper>
        </>
      ) : (
        <>
          <BannerWrapper>
            <StyledLink to={`/`}>
              <Logo>Gamestock</Logo>
            </StyledLink>
            <SignupLogin setLoggedIn={setLoggedIn} />
          </BannerWrapper>
        </>
      )}
    </>
  );
};

export default Header;
