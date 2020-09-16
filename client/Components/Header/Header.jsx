import React, { useState, useEffect } from "react";
import { StyledButton, Wrapper } from "../Core/coreStyles.jsx";
import styled from "styled-components";
import SignupLogin from "../SignupLogin/SignupLogin.jsx";

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

const Logo = styled.img`
  height: 200px;
  weight: 550px;
`;

const Thumbnail = styled.img`
  height: 200px;
  weight: 550px;
`;

const Header = ({ loggedIn, setLoggedIn }) => {
  return (
    <>
      {loggedIn ? (
        <>
          <BannerWrapper>
            <Logo src="https://i.imgur.com/XYg49nh.jpg"></Logo>
            <AvatarWrapper src="https://s3.amazonaws.com/uifaces/faces/twitter/timmillwood/128.jpg"></AvatarWrapper>
            <StyledButton>Username</StyledButton>
          </BannerWrapper>
        </>
      ) : (
        <>
          <BannerWrapper>
            <Logo src="https://i.imgur.com/xlbOHDd.jpg"></Logo>
            <SignupLogin setLoggedIn={setLoggedIn} />
          </BannerWrapper>
        </>
      )}
    </>
  );
};

export default Header;
