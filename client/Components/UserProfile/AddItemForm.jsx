import React, { useState, useEffect } from "react";
import AddItemList from "./AddItemList.jsx";
import NewItemSearchBar from "./NewItemSearchBar.jsx";
import axios from "axios";
import styled from "styled-components";
import {
  StyledInput,
  Wrapper,
  Title,
  WrapGrid,
  StyledButton,
  StyledForm,
  StyledSelect,
} from "../Core/coreStyles.jsx";

const Textarea = styled(StyledInput)`
  background-color: lightgray;
  width: 400px;
  heigth: 100px;
  padding: 25px;
`;
const ConditionSelect = styled(StyledSelect)`
min-width: 50px;
`;

const AddItemForm = (props) => {
  const [dateAcquired, setDateAcquired] = useState("");
  const [purchasedPrice, setPurchasedPrice] = useState(0.00);
  const [itemNotes, setItemNotes] = useState("");
  const [itemCondition, setItemCondition] = useState("New");
  const [isTradeable, setIsTradeable] = useState(false);
  const [isConsole, setIsConsole] = useState(false);

  const [itemSelected, setItemSelected] = useState({});
  const [searchedItems, setSearchedItems] = useState([]);
  const [itemSelectedThumbnail, setSelectedThumbnail] = useState("");
  const [itemSelectedImage, setSelectedImage] = useState("");

  const submittedInfo = {
    title: itemSelected["product-name"],
    console: itemSelected["console-name"],
    is_console: "false",
    user_id: props.userId,
    condition: itemCondition,
    comments: itemNotes,
    starting_price: purchasedPrice,
    date_of_purchase: dateAcquired,
    tradeable: `${isTradeable}`,
    current_value: `${itemSelected["retail-cib-sell"]}`,
    thumbnail: itemSelectedThumbnail,
    front_view: itemSelectedImage,
  };

  function submitInfo(submittedInfo) {
    console.log("Sumbmitted Info: ", submittedInfo);
    axios
      .post("/saveItems", submittedInfo)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // galleryURL // thumbnail
  // pictureURLLarge // image

  function getImage() {
    axios
      .get(`/itemDetails/${itemSelected["product-name"]}`)
      .then(function (response) {
        setSelectedThumbnail(response.data.galleryURL[0]);
        setSelectedImage(response.data.pictureURLLarge[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <div>
        <h2>Add an item to your collection</h2>

        <NewItemSearchBar
          getSearchedItems={(items) => {
            setSearchedItems(items);
          }}
        />

        <img src={itemSelectedThumbnail} alt="THIS IS IMAGE OF THING"></img>
        <br></br>
        <AddItemList
          items={searchedItems}
          select={(item) => {
            setItemSelected(item);
          }}
          getImage={() => {
            getImage();
          }}
        />

        <div>
          <p>Item in Inventory: </p> {itemSelected["console-name"] || ""}{" "}
          {itemSelected["product-name"] || ""}
          <p>Item Stats:</p>
          <StyledForm>
            {/* date when item was bought */}
            <label htmlFor="dateAcquired">Date Acquired:</label>

            <StyledInput
              onChange={(e) => setDateAcquired(e.target.value)}
              type="date"
              id="start"
              value={dateAcquired}
            ></StyledInput>

            <br></br>

            {/* price at purchase of item */}

            <label htmlFor="purchasedPrice">PurchasedPrice:</label>
            <StyledInput
              onChange={(e) => setPurchasedPrice(e.target.value)}
              id="purchasedPrice"
              type="number"
              min="0.01"
              step="0.01"
              value={purchasedPrice}
            ></StyledInput>
            <br></br>

            {/* notes for user comments */}
            <label htmlFor="comment">Item description:</label>
            <Textarea
              onChange={(e) => setItemNotes(e.target.value)}
              rows="4"
              cols="50"
              id="comment"
              value={itemNotes}
            ></Textarea>
            <br></br>
            <label htmlFor="ItemCondition">Item Condition:</label>
            <ConditionSelect
              id="ItemCondition"
              value={itemCondition}
              onChange={(e) => setItemCondition(e.target.value)}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </ConditionSelect>

            <div>
              <label htmlFor="forTrade">tradeable</label>
              <input
                onChange={(e) => setIsTradeable(!isTradeable)}
                type="checkbox"
                id="forTrade"
                checked={isTradeable}
              ></input>
            </div>
            
            <div>
              <label htmlFor="isConsole">This is a Console</label>
              <input
                onChange={(e) => setIsConsole(!isConsole)}
                type="checkbox"
                id="isConsole"
                checked={isConsole}
              ></input>
            </div>

            <StyledButton
              onClick={() => submitInfo(submittedInfo)}
              type="button"
            >
              Submit
            </StyledButton>
          </StyledForm>
        </div>

        <StyledButton
          type="button"
          onClick={() => {
            props.exitModal();
          }}
        >
          Cancel
        </StyledButton>
      </div>
    </div>
  );
};

export default AddItemForm;
