import React, { useState, useEffect } from "react";
import AddItemForm from "./AddItemForm.jsx";

const AddItem = () => {
  const [newItemInfo, setNewItemInfo] = useState(null);

  return <div>
    < AddItemForm submitInfo={(info) => setNewItemInfo(info)} />
  </div>;
};

export default AddItem;
