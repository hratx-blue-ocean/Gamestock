import React, { useState, useEffect } from "react";
import AddItemList from "./AddItemList.jsx";
import NewItemSearchBar from "./NewItemSearchBar.jsx";
import axios from "axios";
import styled from "styled-components";
import {
  StyledInput,
  WrapGrid,
  StyledButton,
  StyledRadio,
  NegativeButton,
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
const GriddedItems = styled(WrapGrid)`
  grid-template-columns: 425px 375px;
`;
const Thumbnail = styled(StyledForm)`
  grid-column-start: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddItemForm = (props) => {
  const [itemSelected, setItemSelected] = useState({ "product-name": "games" });
  const [searchedItems, setSearchedItems] = useState([]);
  const [itemSelectedThumbnail, setSelectedThumbnail] = useState("");
  const [itemSelectedImage, setSelectedImage] = useState("");

  const [dateAcquired, setDateAcquired] = useState("");
  const [purchasedPrice, setPurchasedPrice] = useState(0.0);
  const [itemNotes, setItemNotes] = useState("");
  const [itemCondition, setItemCondition] = useState("A");
  const [isTradeable, setIsTradeable] = useState(false);
  const [isConsole, setIsConsole] = useState(false);

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
    submittedInfo.current_value = Number(submittedInfo.current_value) / 100;
    if (submittedInfo.title == "games") {
      return;
    } else if (submittedInfo["date_of_purchase"] == "") {
      return;
    } else {
      axios
        .post("/saveItems", submittedInfo)
        .then(function (response) {
          // if (props.collection[0].user_id === props.userId) {
          let newCollection = props.collection.map((item) => item);
          submittedInfo.starting_price = `$${submittedInfo.starting_price}`;
          newCollection.push(submittedInfo);
          props.setCollection(newCollection);
          // }
          props.toggleModalState();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getImage();
  }, [itemSelected]);

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

  function clearForm() {
    setItemSelected({ "product-name": "games" });
    setSearchedItems([]);
    setSelectedThumbnail("");
    setSelectedImage("");
    setDateAcquired("");
    setPurchasedPrice(0.0);
    setItemNotes("");
    setItemCondition("A");
    setIsTradeable(false);
    setIsConsole(false);
  }

  return (
    <div>
      <div>
        <NewItemSearchBar
          getSearchedItems={(items) => {
            setSearchedItems(items);
          }}
        />
        <p>Item to Add: </p> {itemSelected["console-name"] || ""}{" "}
        {itemSelected["product-name"] || ""}
        <br></br>
        <GriddedItems>
          <AddItemList
            items={searchedItems}
            select={(item) => {
              setItemSelected(item);
            }}
          />
          <Thumbnail>
            <img src={itemSelectedThumbnail}></img>
          </Thumbnail>
        </GriddedItems>
        <div>
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

            <StyledRadio>
              <input
                onClick={(e) => setIsTradeable(!isTradeable)}
                type="radio"
                id="forTrade"
                checked={isTradeable}
                value={isTradeable}
                onChange={() => {}}
              ></input>
              <label htmlFor="forTrade">Tradeable</label>
            </StyledRadio>

            <StyledRadio>
              <input
                onClick={(e) => setIsConsole(!isConsole)}
                type="radio"
                id="isConsole"
                checked={isConsole}
                value={isConsole}
                onChange={() => {}}
              ></input>
              <label htmlFor="isConsole">This is a console</label>
            </StyledRadio>

            <StyledButton
              onClick={() => {
                submitInfo(submittedInfo);
                clearForm();
              }}
              type="button"
            >
              Submit
            </StyledButton>
          </StyledForm>
        </div>
        <NegativeButton
          type="button"
          onClick={() => {
            props.exitModal();
            clearForm();
          }}
        >
          Cancel
        </NegativeButton>
      </div>
    </div>
  );
};

export default AddItemForm;
