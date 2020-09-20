import React from "react";
import { Text } from "../Core/CardView.jsx";

const DisplayItems = ({ collection }) => {
  // console.log("CURRENT PRICE: ", collection[0].current_price);
  // gets sum of what is being displayed
  let sum = collection.reduce((total, item) => {
    // return total + Number(item.current_price.slice(1).replace(/,/g, ""));
  }, 0);

  return (
    <div>
      <Text>Total items displayed: {collection.length}</Text>
      <Text>
        Total value displayed: $
        {/* REMOVED TO PREVENT CRASHING ON USER PROFILE COLLECTION VIEW */}
        {/* {sum
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
      </Text>
    </div>
  );
};

export default DisplayItems;
