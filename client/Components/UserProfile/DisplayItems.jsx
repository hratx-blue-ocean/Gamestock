import React from "react";
import { Text } from "../Core/CardView.jsx";

const DisplayItems = ({ collection }) => {
  // gets sum of what is being displayed
  let sum = collection.reduce((total, b) => {
    return total + Number(b.starting_price.slice(1));
  }, 0);

  return (
    <div>
      <Text>Total items displayed: {collection.length}</Text>
      <Text>Total value displayed: ${sum.toFixed(2)}</Text>
    </div>
  );
};

export default DisplayItems;
