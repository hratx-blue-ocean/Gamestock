import React, { useState, useEffect } from "react";
import { Wrapper, Dropdown } from "../Core/coreStyles.jsx";
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
  margin-top: 3%;
  padding: 5px 0px;
  &:hover {
    cursor: pointer;
  }
  border-radius: 50%;
  max-height: 50px;
  max-width: 50px;
  margin-left: 56rem;
`;

const Logo = styled.img`
  height: 200px;
  weight: 550px;
  display: flex;
`;

const Thumbnail = styled.img`
  height: 100px;
  weight: 550px;
  display: flex;
`;

const Header = ({ loggedIn, setLoggedIn }) => {
  const [userOptions] = useState([
    {
      label: "Go to",
      value: "default",
    },
    { label: "Log out", value: "logout" },
  ]);

  const handleChange = (event) => {
    if (event.target.value === "logout") {
      axios
        .post("/logout")
        .then((res) => {
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
  console.log(`/profile/${loggedIn.userName}`);
  return (
    <>
      <BannerWrapper>
        {loggedIn.loggedIn ? (
          <>
            <Link to="/">
              <Thumbnail src="https://i.imgur.com/XYg49nh.jpg"></Thumbnail>
            </Link>
            <Link to="/">
              <AvatarWrapper src={avatar}></AvatarWrapper>
            </Link>
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
            <Link to={`/profile/${loggedIn.userName}`}>
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
