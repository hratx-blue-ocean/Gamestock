import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../Core/Banner.jsx";
import styled from "styled-components";
import {
  StyledInput,
  StyledSelect,
  Wrapper,
  Title,
  WrapGrid,
  StyledButton,
  StyledForm,
} from "../Core/coreStyles.jsx";

//style extensions
const LeaderboardGrid = styled(WrapGrid)`
  grid-template-columns: 100px 100px 100px 100px 100px auto 120px 20px 75px 75px 20px 200px;
  margin-top: 30px;
  margin-bottom: 20px;
  align-items: center;
`;
const UserSearchForm = styled(StyledForm)`
  grid-column-start: 1;
  display: flex;
`;
const LeftButton = styled(StyledButton)`
  grid-column-start: 9;
  border-radius: 10px 0px 0px 10px;
  margin: 0;
  border: 1px solid;
`;
const LeaderboardSelect = styled(StyledSelect)`
  grid-column-start: 12;
`;
const RightButton = styled(StyledButton)`
  border-radius: 0px 10px 10px 0px;
  margin: 0;
  border: 1px solid;
`;
const SearchBy = styled.p`
  grid-column-start: 7;
  margin: 0;
  text-align: center;
`;

const Leaderboard = () => {
  const [userSearch, setUserSearch] = useState("");
  const [collectionsByValueOrSize, setCollectionsByValueOrSize] = useState([]);
  // const [collectionsByConsole, setCollectionsByConsole] = useState([]);
  const [consoles, setConsoles] = useState([]);

  useEffect(() => {
    // sort by value on page load
    getCollectionsByValueOrSize("sortByValue");
    getAllConsoles();
  }, []);

  // form handlers
  const handleUserSearchChange = (e) => {
    setUserSearch(e.target.value);
  };
  const handleUserSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`${userSearch} SUBMITTED`);
  };

  // gets leaderboard, sorted either by value or size depending on which button is pressed
  const getCollectionsByValueOrSize = (e) => {
    // added this in so it works in useEffect by passing in a string for default sort by value on page load
    if (typeof e !== "string") {
      e.preventDefault();
    }
    // console.log(e)
    // if we clicked the value button, hit the endpoint to return results by value
    if (e === "sortByValue" || e.target.id === "sortByValue") {
      axios
        .get("/leaderboard/value")
        .then((recordsByValue) => {
          setCollectionsByValueOrSize(() => recordsByValue.data.rows);
        })
        .catch((err) => {
          console.log("Error getting top collections by value: ", err);
        });
      // otherwise (this fn is only used for sorting by value & size), hit the endpoint to sort on size
    } else {
      axios
        .get("/leaderboard/size")
        .then((recordsBySize) => {
          setCollectionsByValueOrSize(() => recordsBySize.data.rows);
        })
        .catch((err) => {
          console.log("Error getting top collections by size: ", err);
        });
    }
  };

  const getCollectionsByConsole = (e) => {
    console.log("SELECT CHANGE: ", e.target.value);
    axios
      .get("/leaderboard/console", {
        params: {
          console: e.target.value,
        },
      })
      .then((recordsByConsole) => {
        setCollectionsByValueOrSize(() => recordsByConsole.data.rows);
      })
      .catch((err) => {
        console.log("Error getting top collections by console :", err);
      });
  };

  const getAllConsoles = () => {
    axios
      .get("/consoles")
      .then((consoles) => {
        setConsoles(() => consoles.data.rows);
      })
      .catch((err) => {
        console.log("Error getting consoles: ", err);
      });
  };

  return (
    <div>
      <Wrapper>
        <Title>Leaderboard</Title>
        <LeaderboardGrid>
          <UserSearchForm onSubmit={handleUserSearchSubmit}>
            <StyledInput
              placeholder="search users"
              type="text"
              value={userSearch}
              onChange={handleUserSearchChange}
            ></StyledInput>
            <StyledButton>Search</StyledButton>
          </UserSearchForm>
          <SearchBy>Sort By: </SearchBy>
          <LeftButton id="sortByValue" onClick={getCollectionsByValueOrSize}>
            Value
          </LeftButton>
          <RightButton id="sortBySize" onClick={getCollectionsByValueOrSize}>
            Size
          </RightButton>

          <LeaderboardSelect onChange={getCollectionsByConsole}>
            <option value="" disabled selected>
              select console
            </option>
            {consoles.map((console, idx) => (
              <option key={idx} id={console.console}>
                {console.console}
              </option>
            ))}
          </LeaderboardSelect>
        </LeaderboardGrid>
        {collectionsByValueOrSize.map((collection, idx) => (
          <Banner
            username={collection.username}
            collectionSize={collection.total_count}
            collectionValue={collection.total_value}
            avatar={collection.avatar}
            key={idx}
          />
        ))}
      </Wrapper>
    </div>
  );
};

export default Leaderboard;
