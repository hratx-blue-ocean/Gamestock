import React from "react";
import Card from "./Card.jsx";

const CollectionList = ({ users, items, prices }) => {
  return (
    <div>
      <ul>
        <li>
          <Card users={users} items={items} prices={prices} />
        </li>
      </ul>
    </div>
  );
};

export default CollectionList;
