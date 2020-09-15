import React, { useState, useEffect } from "react";
import AddItemSingleItem from "./AddItemSingleItem.jsx"
const AddItemList = (props) => {
  return (
    <div>
      {props.items.map((itemObj) => {
        return <AddItemSingleItem item={itemObj} select={(item) => {props.select(item)}}/>;
      })}
    </div>
    // <div>
    //     <AddItemSingleItem />
    //     <AddItemSingleItem />
    //     <AddItemSingleItem />
    // </div>
  );
};

export default AddItemList;
