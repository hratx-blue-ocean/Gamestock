import React from "react";
import CollectionList from "./CollectionList.jsx";

const Middle = ({ collection }) => {
  return (
    <div>
      {/* child of collectionList will be card */}
      <CollectionList collection={collection} />
    </div>
  );
};

export default Middle;
