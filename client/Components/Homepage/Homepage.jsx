import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../Core/Banner.jsx";
import Leaderboard from "./Leaderboard.jsx";
import PriceGraph from "../PriceGraph/PriceGraph.jsx";

const Homepage = ({
  collectionOwnerName,
  setCollectionOwnerName,
  loggedIn,
}) => {
  const [userID, setUserID] = useState(121);
  const [userCollection, setUserCollection] = useState({});
  const [itemID, setItemID] = useState(7);
  const [priceData, setPriceData] = useState([]);
  const [userCollectionData, setUserCollectionData] = useState([]);

  useEffect(() => {
    // sort by value on page load
    if (userID === 0 && loggedIn) {
      setUserID(loggedIn.userId);
    }
    getUserCollection(userID);
    getDailyPrices(itemID);
    getDailyCollectionPrice("Adeline.Koepp47");
  }, []);

  const getUserCollection = (userID) => {
    axios
      .get("/collection/user", {
        params: {
          userID: userID,
        },
      })
      .then((collection) => {
        console.log("COLLECTION: ", collection);
        setUserCollection(() => collection.data.rows[0]);
      })
      .catch((err) => {
        console.log("Error retrieving collection: ", err);
      });
  };

  if (loggedIn.loggedIn) {
    console.log("logged in");
  }
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

  const getDailyCollectionPrice = (username) => {
    axios
      .get("/userCollectionValue", {
        params: {
          username: "Adeline.Koepp47",
        },
      })
      .then((userCollectionPrices) => {
        console.log(userCollectionPrices);
        const pricesAndDates = [[], []];
        userCollectionPrices.data.rows.map((collection) => {
          pricesAndDates[0].push(collection.date.slice(0, 10));
          pricesAndDates[1].push(
            parseFloat(collection.total_value.slice(1).replace(/,/g, ""))
          );
        });
        setUserCollectionData(() => pricesAndDates);
      })
      .catch((err) => {
        console.log("Error getting user collection data: ", err);
      });
  };

  return (
    <div>
      {loggedIn.loggedIn && (
        <Banner
          avatar={userCollection.avatar}
          username={userCollection.username}
          collectionSize={userCollection.total_count}
          collectionValue={userCollection.total_value}
          collectionOwnerName={collectionOwnerName}
          setCollectionOwnerName={setCollectionOwnerName}
        />
      )}
      <Leaderboard
        collectionOwnerName={collectionOwnerName}
        setCollectionOwnerName={setCollectionOwnerName}
      />
      <PriceGraph dates={priceData[0]} prices={priceData[1]} />
      <PriceGraph
        dates={userCollectionData[0]}
        prices={userCollectionData[1]}
      />
    </div>
  );
};

export default Homepage;
