import React from "react";


const AddItemSingleItem = (props) => {
  return <div>
      <p onClick={() => {props.select(props.item)}}>{props.item["console-name"]} {props.item["product-name"]}</p>
  </div>;
};

export default AddItemSingleItem;