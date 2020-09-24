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
const TitleWrapper = styled(Wrapper)`
  border: none;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 50px repeat(auto-fill, 215px);
  background: #1e1e1e;
  color: #54f3f7;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
`;

const Leaderboard = (props) => {
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
    document.getElementById("consoleSelectLeaderboard").selectedIndex = 0;
    if (userSearch === "") {
      getCollectionsByValueOrSize("sortByValue");
    } else {
      axios
        .get("/username/collectionValue", {
          params: {
            username: userSearch,
          },
        })
        .then((userCollection) => {
          setCollectionsByValueOrSize(() => userCollection.data.rows);
        })
        .then(() => setUserSearch(""))
        .catch((err) => {
          console.log("Error searching for user: ", err);
        });
    }
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
          console.log("records by value: ", recordsByValue);
          setCollectionsByValueOrSize(() => recordsByValue.data.rows);
        })
        .then(() => {
          document.getElementById("usernameSearch").value = "";
          document.getElementById("consoleSelectLeaderboard").selectedIndex = 0;
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
        .then(() => {
          document.getElementById("usernameSearch").value = "";
          document.getElementById("consoleSelectLeaderboard").selectedIndex = 0;
        })
        .catch((err) => {
          console.log("Error getting top collections by size: ", err);
        });
    }
  };

  const getCollectionsByConsole = (e) => {
    console.log("SELECT CHANGE: ", e.target.value);
    if (e.target.value === "select console") {
      getCollectionsByValueOrSize("sortByValue");
    } else {
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
    }
  };

  const clearSearch = (e) => {
    e.preventDefault();
    document.getElementById("usernameSearch").value = "";
    setUserSearch("");
    getCollectionsByValueOrSize("sortByValue");
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
              id="usernameSearch"
              placeholder="search users"
              type="text"
              value={userSearch}
              onChange={handleUserSearchChange}
            ></StyledInput>
            <StyledButton>Search</StyledButton>
            <StyledButton id="clearSearch" onClick={clearSearch}>
              Clear
            </StyledButton>
          </UserSearchForm>
          <SearchBy>Sort By: </SearchBy>
          <LeftButton id="sortByValue" onClick={getCollectionsByValueOrSize}>
            Value
          </LeftButton>
          <RightButton id="sortBySize" onClick={getCollectionsByValueOrSize}>
            Size
          </RightButton>
          <LeaderboardSelect
            onChange={getCollectionsByConsole}
            defaultValue="select console"
            id="consoleSelectLeaderboard"
          >
            <option id="default">select console</option>
            {consoles.map((console, idx) => (
              <option key={idx} id={console.console}>
                {console.console}
              </option>
            ))}
          </LeaderboardSelect>
        </LeaderboardGrid>
        <TitleWrapper>
          <p></p>
          <p></p>
          <p>Gamer Tag</p>
          <p>Collection Size</p>
          <p>Collection Value</p>
        </TitleWrapper>
        {collectionsByValueOrSize.map((collection, idx) => (
          <Banner
            rank={collection.rank}
            username={collection.username}
            collectionSize={collection.total_count}
            collectionValue={collection.total_value}
            avatar={collection.avatar}
            key={idx}
            collectionOwnerName={props.collectionOwnerName}
            setCollectionOwnerName={props.setCollectionOwnerName}
          />
        ))}
      </Wrapper>
    </div>
  );
};

export default Leaderboard;
