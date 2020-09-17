import React, { useState, useEffect } from "react";
import { StyledButton, Wrapper, Dropdown } from "../Core/coreStyles.jsx";
import styled from "styled-components";
import SignupLogin from "../SignupLogin/SignupLogin.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

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
  margin-left: 70%;
  margin-top: 20px;
  padding: 5px 0px;
  &:hover {
    cursor: pointer;
  }
  border-radius: 50%;
  max-height: 50px;
  max-width: 50px;
`;

const Logo = styled.img`
  grid-column-start: 1;
  height: 200px;
  weight: 550px;
  display: flex;
`;

const Thumbnail = styled.img`
  grid-column-start: 1;
  height: 100px;
  weight: 550px;
  display: flex;
`;

const Header = ({ loggedIn, setLoggedIn }) => {
  const [userOptions] = useState([
    {
      label: "See my profile",
      value: "userProfile",
    },
    { label: "Log out", value: "logout" },
  ]);

  const handleChange = (event) => {
    if (event.target.value === "logout") {
      axios
        .post("/logout")
        .then((res) => {
          console.log(res);
          setLoggedIn({
            loggedIn: false,
            userName: "",
            userId: 0,
          });
        })
        .catch((err) => console.log(err));
    } else {
      event.preventDefault();
      //switch to user profile
    }
  };

  return (
    <>
      <BannerWrapper>
        {loggedIn.loggedIn ? (
          <>
            <Link to="/">
              <Thumbnail src="https://i.imgur.com/XYg49nh.jpg"></Thumbnail>
            </Link>
            <AvatarWrapper src="https://s3.amazonaws.com/uifaces/faces/twitter/timmillwood/128.jpg"></AvatarWrapper>
            <Dropdown value="selection" onChange={(e) => handleChange(e)}>
              <option key={userOptions[0].value} value={userOptions[0].value}>
                {userOptions[0].label}
              </option>
              <option key={userOptions[1].value} value={userOptions[1].value}>
                {userOptions[1].label}
              </option>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/">
              <Logo src="https://i.imgur.com/xlbOHDd.jpg"></Logo>
            </Link>
            <SignupLogin setLoggedIn={setLoggedIn} />
          </>
        )}
      </BannerWrapper>
    </>
  );
};

export default Header;
