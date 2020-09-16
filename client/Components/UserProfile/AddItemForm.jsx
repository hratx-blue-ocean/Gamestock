import React, { useState, useEffect } from "react";
import AddItemList from "./AddItemList.jsx";
import NewItemSearchBar from "./NewItemSearchBar.jsx";

const AddItemForm = ({ submitInfo }) => {
  const [dateAcquired, setDateAcquired] = useState("");
  const [purchasedPrice, setPurchasedPrice] = useState(0);
  const [itemNotes, setItemNotes] = useState("");
  const [itemCondition, setItemCondition] = useState("New");
  const [isTradeable, setIsTradeable] = useState(false);

  const [itemSelected, setItemSelected] = useState({});
  const [searchedItems, setSearchedItems] = useState([]);

  const submittedInfo = {
    title: itemSelected["product-name"],
    console: itemSelected["console-name"],
    is_console: false, //currently hardcoded as false
    user_id: 4000, //Need to ask auth team
    condition: itemCondition,
    comments: itemNotes,
    starting_price: purchasedPrice,
    date_of_purchase: dateAcquired,
    tradeable: isTradeable,
    current_value: itemSelected["retail-cib-sell"],
  };

  return (
    <div>
      <div>
        <h1>This is Add Item</h1>
        <NewItemSearchBar
          getSearchedItems={(items) => {
            setSearchedItems(items);
          }}
        />
        <br></br>
        <AddItemList
          items={searchedItems}
          select={(item) => {
            setItemSelected(item);
          }}
        />

        <div>
          <p>Item in Inventory: </p> {itemSelected["console-name"] || ""}{" "}
          {itemSelected["product-name"] || ""}
          <p>Item Stats:</p>
          <form>
            {/* date when item was bought */}
            <label htmlFor="dateAcquired">Date Acquired:</label>

            <input
              onChange={(e) => setDateAcquired(e.target.value)}
              type="date"
              id="start"
              value={dateAcquired}
            ></input>

            <br></br>

            {/* price at purchase of item */}

            <label htmlFor="purchasedPrice">PurchasedPrice:</label>
            <input
              onChange={(e) => setPurchasedPrice(e.target.value)}
              id="purchasedPrice"
              type="number"
              min="0.01"
              step="0.01"
              value={purchasedPrice}
            />
            <br></br>

            {/* notes for user comments */}
            <label htmlFor="comment">Item description:</label>
            <textarea
              onChange={(e) => setItemNotes(e.target.value)}
              rows="4"
              cols="50"
              id="comment"
              value={itemNotes}
            ></textarea>
            <br></br>
            <label htmlFor="ItemCondition">Item Condition:</label>
            <select
              id="ItemCondition"
              value={itemCondition}
              onChange={(e) => setItemCondition(e.target.value)}
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>

            <div>
              <label htmlFor="forTrade">tradeable</label>
              <input
                onChange={(e) => setIsTradeable(!isTradeable)}
                type="checkbox"
                id="forTrade"
                checked={isTradeable}
              ></input>
            </div>
            <button onClick={() => submitInfo(submittedInfo)} type="button">
              Submit
            </button>
          </form>
        </div>

        <button type="button">Cancel</button>
      </div>
    </div>
  );
};

export default AddItemForm;
