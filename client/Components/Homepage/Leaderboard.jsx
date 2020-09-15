import React, { useState } from "react";
import Banner from "../Core/Banner.jsx";
import styled from "styled-components";
import {
  Input,
  Wrapper,
  GlobalStyles,
  Title,
  WrapGrid,
  Button,
  Form,
} from "../Core/coreStyles.jsx";

const Leaderboard = () => {
  const [userSearch, setUserSearch] = useState("");

  // form handlers
  const handleUserSearchChange = (e) => {
    setUserSearch(e.target.value);
  };
  const handleUserSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`${userSearch} SUBMITTED`);
  };

  //style extensions
  const LeaderboardGrid = styled(WrapGrid)`
    grid-template-columns: 100px 100px 100px 100px 100px auto 75px 75px 75px 75px 75px 100px;
    margin-top: 30px;
    margin-bottom: 20px;
  `;
  const UserSearchForm = styled(Form)`
    grid-column-start: 1;
    display: flex;
  `;
  const LeftButton = styled(Button)`
    grid-column-start: 7;
    border-radius: 10px 0px 0px 10px;
    margin: 0;
    border: 1px solid;
  `;
  const MiddleButton = styled(Button)`
    border-radius: 0px;
    margin: 0;
    border: 1px solid;
  `;
  const RightButton = styled(Button)`
    border-radius: 0px 10px 10px 0px;
    margin: 0;
    border: 1px solid;
  `;

  return (
    <div>
      <Wrapper>
        <Title>Leaderboard</Title>
        <LeaderboardGrid>
          <UserSearchForm onSubmit={handleUserSearchSubmit}>
            <Input
              placeholder="search users"
              type="text"
              value={userSearch}
              onChange={handleUserSearchChange}
            ></Input>
            <Button>Search</Button>
          </UserSearchForm>
          <LeftButton>Value</LeftButton>
          <MiddleButton>Size</MiddleButton>
          <MiddleButton>PC</MiddleButton>
          <MiddleButton>Sony</MiddleButton>
          <MiddleButton>Xbox</MiddleButton>
          <RightButton>Nintendo</RightButton>
        </LeaderboardGrid>
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
      </Wrapper>
    </div>
  );
};

export default Leaderboard;
