import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../Core/Banner.jsx";
import Leaderboard from "./Leaderboard.jsx";

const Homepage = ({
  collectionOwnerName,
  setCollectionOwnerName,
  loggedIn,
  userId,
}) => {
  const [userCollection, setUserCollection] = useState({});
  const [itemID, setItemID] = useState(7);

  const [userCollectionData, setUserCollectionData] = useState([]);

  useEffect(() => {
    // populates data for user banner for logged in user
    getUserCollection(userId);
  }, [userId]);

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
      {loggedIn.userId && (
        <Banner
          avatar={loggedIn.userAvatar}
          username={loggedIn.userName}
          collectionSize={userCollection.total_count || "0"}
          collectionValue={userCollection.total_value || "$0.00"}
          collectionOwnerName={collectionOwnerName}
          setCollectionOwnerName={setCollectionOwnerName}
        />
      )}
      <Leaderboard
        collectionOwnerName={collectionOwnerName}
        setCollectionOwnerName={setCollectionOwnerName}
      />
    </div>
  );
};

export default Homepage;
