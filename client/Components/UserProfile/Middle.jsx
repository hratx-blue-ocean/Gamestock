import React from "react";
import UserProfile from "./UserProfile.jsx";
import DisplayItems from "./DisplayItems.jsx";
import DisplayItemsValue from "./DisplayItemsValue.jsx";
import Print from "./Print.jsx";
import CollectionList from "./CollectionList.jsx";

const Middle = ({ users, prices, items }) => {
  return (
    <div>
      {/* these first two things are displaying the number of items and their combined value */}
      <DisplayItems items={items} />
      <DisplayItemsValue prices={prices} />
      {/* print will be the print button that converts the information displayed into a csv file... node fs and other libraries can assist with this */}
      <Print />
      {/* child of collectionList will be card */}
      <CollectionList users={users} items={items} prices={prices} />
    </div>
  );
};

export default Middle;
