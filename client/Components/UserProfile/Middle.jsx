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
