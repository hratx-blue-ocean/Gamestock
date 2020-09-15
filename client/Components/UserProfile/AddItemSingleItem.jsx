import React from "react";


const AddItemSingleItem = () => {
  // edit and delete button
  return <div>
      <p onClick={() => {console.log({item: 'item from Single Item'})}}>This is Single Item</p>
  </div>;
};

export default AddItemSingleItem;