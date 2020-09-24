import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../Core/Banner.jsx";
import Leaderboard from "./Leaderboard.jsx";
import { Wrapper } from "../Core/coreStyles.jsx";
import styled from "styled-components";

const Intro = styled(Wrapper)`
  display: flex;
  justify-content: center;
  text-align: center;
`;
const IntroText = styled.p`
  padding: 2px;
  line-height: 1.6;
`;

const Homepage = ({
  collectionOwnerName,
  setCollectionOwnerName,
  loggedIn,
}) => {
  const [userCollection, setUserCollection] = useState({});
  const [itemID, setItemID] = useState(7);

  const [userCollectionData, setUserCollectionData] = useState([]);

  useEffect(() => {
    // populates data for user banner for logged in user
    getUserCollection(loggedIn.userId);
  }, [loggedIn.userId]);

  const getUserCollection = (input) => {
    axios
      .get("/collection/user", {
        params: {
          userID: input,
        },
      })
      .then((collection) => {
        console.log("COLLECTION: ", collection);
        setUserCollection(() => collection.data.rows[0] || {});
      })
      .catch((err) => {
        console.log("Error retrieving collection: ", err);
      });
  };

  return (
    <div>
      {loggedIn.userId ? (
        <>
          <Banner
            avatar={loggedIn.userAvatar}
            username={loggedIn.userName}
            collectionSize={userCollection.total_count || "0"}
            collectionValue={userCollection.total_value || "$0.00"}
            rank={userCollection.rank}
            collectionOwnerName={collectionOwnerName}
            setCollectionOwnerName={setCollectionOwnerName}
          />
          <Leaderboard
            collectionOwnerName={collectionOwnerName}
            setCollectionOwnerName={setCollectionOwnerName}
          />
        </>
      ) : (
        <>
          <Intro>
            <IntroText>
              Welcome to MyGameStocks! A stock tracker for your vintage video
              games. To get started, set up a user account and start adding
              games to your profile!
            </IntroText>
          </Intro>
          <Leaderboard
            collectionOwnerName={collectionOwnerName}
            setCollectionOwnerName={setCollectionOwnerName}
          />
        </>
      )}
    </div>
  );
};

export default Homepage;
