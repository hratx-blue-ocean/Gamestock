import React, { useState, useEffect } from "react";
import { Wrapper, Dropdown, CenteredDiv } from "../Core/coreStyles.jsx";
import styled from "styled-components";
import SignupLogin from "../SignupLogin/SignupLogin.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import avatar from "../../Icons/pacman.svg";
import avatar2 from "../../Icons/defaultAvatar.png";

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
  &:hover {
    cursor: pointer;
  }
  border-radius: 50%;
  max-height: 50px;
  max-width: 50px;
  display: inline-block;
`;

const HiddenLink = styled(Link)`
  display: none;
`;

const LogoWrapper = styled.div`
  height: 60px;
  width: 300px;
  overflow: hidden;
`;

const Logo = styled.img`
  width: 100%;
  object-position: 0px -120px;
`;

const Thumbnail = styled.img`
  height: 100px;
  weight: 550px;
  display: flex;
`;

const Header = ({ setCollectionOwnerName, loggedIn, setLoggedIn }) => {
  const [userOptions, setUserOptions] = useState([
    {
      label: "user",
      value: 0,
    },
    {
      label: "Go to",
      value: "default",
    },
    { label: "Log out", value: "logout" },
  ]);

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.value === "logout") {
      axios
        .post("/logout")
        .then((res) => {
          setLoggedIn({
            loggedIn: false,
            userName: "",
            userId: 0,
            userAvatar: "",
          });
        })
        .catch((err) => console.log(err));
    } else if (event.target.value === "userProfile") {
      document.getElementById("toUserProfile").click();
      //switch to user profile
    }
  };

  useEffect(() => {
    const lockBod = document.getElementsByTagName("body")[0];
    if (lockBod.classList.contains("freeze")) {
      lockBod.classList.remove("freeze");
    }
    if (loggedIn.loggedIn) {
      setUserOptions([
        {
          label: loggedIn.userName,
          value: loggedIn.userId,
        },
        {
          label: "See my profile",
          value: "userProfile",
        },
        { label: "Log out", value: "logout" },
      ]);
    }
  }, [loggedIn.userId]);
  return (
    <>
      <BannerWrapper>
        {loggedIn.loggedIn ? (
          <>
            <Link to="/">
              <LogoWrapper>
                <Logo src="https://mygamestocks.com/resources/nobgLogo.png"></Logo>
              </LogoWrapper>
            </Link>
            <CenteredDiv>
              <Link to={`/profile/${loggedIn.userName}`}>
                <AvatarWrapper
                  onClick={() => {
                    setCollectionOwnerName(loggedIn.userName);
                  }}
                  src={loggedIn.userAvatar}
                ></AvatarWrapper>
              </Link>
              <Dropdown value="selection" onChange={(e) => handleChange(e)}>
                {userOptions.map((option, index) => {
                  if (!index) {
                    return (
                      <option
                        key={option.value}
                        value={option.value}
                        defaultValue
                      >
                        {option.label}
                      </option>
                    );
                  } else {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  }
                })}
              </Dropdown>
              <HiddenLink
                to={`/profile/${loggedIn.userName}`}
                id="toUserProfile"
                onClick={() => {
                  setCollectionOwnerName(loggedIn.userName);
                }}
              />
            </CenteredDiv>
          </>
        ) : (
          <>
            <Link to="/">
              <LogoWrapper>
                <Logo src="https://mygamestocks.com/resources/nobgLogo.png"></Logo>
              </LogoWrapper>
            </Link>
            <SignupLogin setLoggedIn={setLoggedIn} />
          </>
        )}
      </BannerWrapper>
    </>
  );
};

export default Header;
