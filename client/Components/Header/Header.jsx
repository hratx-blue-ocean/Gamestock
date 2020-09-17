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
  console.log(loggedIn.userName);
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
  console.log(userOptions);

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
      //switch to user profile
    }
  };

  useEffect(() => {
    if (userOptions[0].value === 0 && loggedIn.loggedIn) {
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
  });

  return (
    <>
      <BannerWrapper>
        {loggedIn.loggedIn ? (
          <>
            <Link to="/">
              <Thumbnail src="https://i.imgur.com/XYg49nh.jpg"></Thumbnail>
            </Link>
            <Link to="/">
              <AvatarWrapper src={loggedIn.userAvatar}></AvatarWrapper>
            </Link>
            <Dropdown value="selection" onChange={(e) => handleChange(e)}>
              {userOptions.map((option, index) => {
                if (!index) {
                  return (
                    <option key={option.value} value={option.value} selected>
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
              {/* <option key={userOptions[0].value} value={userOptions[0].value}>
                {userOptions[0].label}
              </option>
              <option key={userOptions[1].value} value={userOptions[1].value}>
                {userOptions[1].label}
              </option>
              <option key={userOptions[2].value} value={userOptions[2].value}>
                {userOptions[1].label}
              </option> */}
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
