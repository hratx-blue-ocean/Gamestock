import React from "react";
import DisplayItems from "./DisplayItems.jsx";
import DisplayItemsValue from "./DisplayItemsValue.jsx";
import Print from "./Print.jsx";
import CollectionList from ".CollectionList.jsx";

const Middle = () => {
  return (
    <div>
    <DisplayItems />
    <DisplayItemsValue />
    <Print />
    <CollectionList />
    </div>
  )
};

export default Middle;