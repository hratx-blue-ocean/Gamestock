import React, { useState } from "react";
import DisplayItems from "./DisplayItems.jsx";
import DisplayItemsValue from "./DisplayItemsValue.jsx";
import Print from "./Print.jsx";
import CollectionList from ".CollectionList.jsx";

const Middle = () => {
  // useState to store the array of returned data from items table
  const [items, setItems] = useState([]);
  // useState to store the array of returned data from items_value_by_date
  const [prices, setPrices] = useState([]);
  // useState to store the array of returned data from users
  const [users, setUsers] = useState([]);

  // data needed for these child components
  // total value and total number of items of the colleciton currently being displayed (displayItems and displayItemsValue)
  // game thumbnail, game title, game price, console

  axios.get("/userProfile/items").then((data) => {
    console.log("ITEMS: ", data);
    setItems(data);
  });

  axios.get("/userProfile/prices").then((data) => {
    console.log("PRICES: ", data);
    setPrices(data);
  });

  axios.get("/userProfile/users").then((data) => {
    console.log("USERS: ", data);
    setUsers(data);
  });

  // const getItems = () => {
  //   return axios.get("/userProfile/items");
  // };

  // const getPrices = () => {
  //   return axios.get("userProfile/prices");
  // };

  // axios.all([getItems(), getPrices()]).then(
  //   axios.spread((items, prices) => {
  //     console.log("ITEMS: ", items);
  //     console.log("PRICES: ", prices);
  //     // setItems(items);
  //     // setPrices(prices);
  //   })
  // );

  return (
    <div>
      <DisplayItems />
      <DisplayItemsValue />
      <Print />
      <CollectionList />
    </div>
  );
};

export default Middle;
