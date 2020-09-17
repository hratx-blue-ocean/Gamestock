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
  // return (
  //   <div>
  //     {props.items.map((itemObj, idx) => {
  //       return (
  //       <div key={idx} onClick={() => {
  //         props.select(itemObj);
  //         props.getImage();
  //       }}>
  //         {itemObj["console-name"]} {itemObj["product-name"]}
  //       </div>
  //       )
  //     })}
  //   </div>
  // )
};

export default AddItemList;
