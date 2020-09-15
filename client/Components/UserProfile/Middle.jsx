import React from "react";
import UserProfile from "./UserProfile.jsx";
import DisplayItems from "./DisplayItems.jsx";
import DisplayItemsValue from "./DisplayItemsValue.jsx";
import Print from "./Print.jsx";
import CollectionList from "./CollectionList.jsx";

const Middle = ({ collections, prices, items }) => {
  return (
    <div>
      {/* these first two things are displaying the number of items and their combined value */}
      <DisplayItems items={items} />
      <DisplayItemsValue prices={prices} />
      {/* child of collectionList will be card */}
      <CollectionList collections={collections} items={items} prices={prices} />
    </div>
  );
};

export default Middle;
