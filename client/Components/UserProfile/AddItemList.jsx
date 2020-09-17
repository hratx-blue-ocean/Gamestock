import React, { useState, useEffect } from "react";
import AddItemSingleItem from "./AddItemSingleItem.jsx";

const AddItemList = (props) => {
  return (
    <div>
      {props.items.map((itemObj) => {
        return (
          <AddItemSingleItem
            key={itemObj.id}
            item={itemObj}
            select={(item) => {
              props.select(item);
            }}
            getImage={() => {
              props.getImage();
            }}
          />
        );
      })}
    </div>
  );
};

export default AddItemList;
