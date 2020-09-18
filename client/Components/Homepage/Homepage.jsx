import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../Core/Banner.jsx";
import Leaderboard from "./Leaderboard.jsx";
import PriceGraph from "../PriceGraph/PriceGraph.jsx";

const Homepage = ({
  collectionOwnerName,
  setCollectionOwnerName,
  loggedIn,
  userId,
}) => {
  const [userCollection, setUserCollection] = useState({});
  const [itemID, setItemID] = useState(7);
  const [priceData, setPriceData] = useState([]);
  const [userCollectionData, setUserCollectionData] = useState([]);

  useEffect(() => {
    // sort by value on page load
    getDailyPrices(itemID); //
  }, []);

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
  const getDailyPrices = (userID) => {
    axios
      .get("/prices/items", {
        params: {
          itemID: itemID,
        },
      })
      .then((priceData) => {
        const pricesAndDates = [[], []];
        priceData.data.rows.forEach((date) => {
          pricesAndDates[0].push(date.date.slice(0, 10));
          pricesAndDates[1].push(parseFloat(date.total_value.slice(1)));
        });
        setPriceData(() => pricesAndDates);
      })
      .catch((err) => {
        console.log("Error getting price data: ", err);
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
      <PriceGraph dates={priceData[0]} prices={priceData[1]} />
    </div>
  );
};

export default Homepage;
