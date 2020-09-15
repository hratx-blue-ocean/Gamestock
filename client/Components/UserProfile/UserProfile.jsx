// parent component for user profile
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import AddItem from "./AddItem.jsx"; //add item to modal form
import Middle from "./Middle.jsx";
import Pagination from "./Pagination.jsx";

const UserProfile = () => {
  // useState to store the array of returned data from items table
  const [items, setItems] = useState([]);
  // useState to store the array of returned data from items_value_by_date
  const [prices, setPrices] = useState([]);
  // useState to store the array of returned data from users
  const [users, setUsers] = useState([]);

  // data needed for these child components
  // total value and total number of items of the colleciton currently being displayed (displayItems and displayItemsValue)
  // game thumbnail, game title, game price, console

  const getInfo = () => {
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
  };

  useEffect(() => {
    if (items.length === 0) {
      getInfo();
    }
  });

  return (
    <div>
      <h2>UserProfile!</h2>
      <Header />
      <AddItem />
      <Middle users={users} prices={prices} items={items} />
      <Pagination />
    </div>
  );
};

export default UserProfile;
