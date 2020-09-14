// parent component for user profile
import React, { useState } from "react";
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

  return (
    <div>
      <Header />
      <AddItem />
      <Middle users={users} prices={prices} items={items} />
      <Pagination />
    </div>
  );
};

export default UserProfile;
