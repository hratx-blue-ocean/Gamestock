import React from "react";
import CollectionList from "./CollectionList.jsx";

const Middle = ({ collections, prices, items }) => {
  return (
    <div>
      {/* child of collectionList will be card */}
      <CollectionList collections={collections} items={items} prices={prices} />
    </div>
  );
};

export default Middle;
