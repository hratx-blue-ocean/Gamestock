import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../Core/Banner.jsx";
import Leaderboard from "./Leaderboard.jsx";

const Homepage = () => {
  const [userID, setUserID] = useState(1);
  const [userCollection, setUserCollection] = useState({});

  useEffect(() => {
    // sort by value on page load
    getUserCollection(userID);
  }, []);

  const getUserCollection = (userID) => {
    axios
      .get("/collection/user", {
        params: {
          userID: userID,
        },
      })
      .then((collection) => {
        setUserCollection(() => collection.data.rows[0]);
      })
      .catch((err) => {
        console.log("Error retrieving collection: ", err);
      });
  };

  return (
    <div>
      <Banner
        avatar={userCollection.avatar}
        username={userCollection.username}
        collectionSize={userCollection.total_count}
        collectionValue={userCollection.total_value}
      />
      <Leaderboard />
    </div>
  );
};

export default Homepage;
