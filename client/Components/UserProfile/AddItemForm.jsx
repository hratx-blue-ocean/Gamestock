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
  StyledLabel,
  StyledTextarea,
  NegativeButton,
  StyledForm,
  StyledSelect,
  CenteredDiv,
  Wrapper,
} from "../Core/coreStyles.jsx";

const CellInputs = styled(StyledInput)`
  min-width: 150px;
`;

const SelectedItemText = styled(CenteredDiv)`
  color: #eb29fd;
  margin: 0px;
`;

const FormStyled = styled(StyledForm)`
text-align: center;
`

const Textarea = styled(StyledTextarea)`
  display: table-cell;
  border: none;
  background-color: transparent;
  outline: none;
  resize: none;
`;

const TextareaWrap = styled(Wrapper)`
  margin: 0px auto;
  margin-top: 0px;
  padding: 0px;
  background: lightgray;
  color: #5a2dad;
  border-radius: 10px;
  border: 2px solid #eb29fd;
  box-sizing: border-box;
  max-width: 1200px;
`;

const PriceInput = styled(StyledInput)`
  min-width: 150px;
  text-align: right;
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

const SubmitLeftButton = styled(StyledButton)`
  border-radius: 10px 0px 0px 10px;
  margin: 0;
  border: 2px solid #2d1c7b;
`;

const CancelRightButton = styled(NegativeButton)`
  border-radius: 0px 10px 10px 0px;
  margin: 0;
  border: 1px solid;
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
      return; //tell user request failed
    } else if (submittedInfo["date_of_purchase"] == "") {
      return; //tell user request failed
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
          clearForm();
          props.exitModal();
        })
        .catch((error) => {
          console.log(error); //tell user request failed
        });
    }
  }
  //add conditionals
  //if conditionals, don't reset state
  //tell users why request failed

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
    <CenteredDiv>
      <NewItemSearchBar
        getSearchedItems={(items) => {
          setSearchedItems(items);
        }}
      />
      <SelectedItemText>
        <span>Item to Add:</span>
        {itemSelected["console-name"] || ""}{" "}
        {itemSelected["product-name"] || ""}
      </SelectedItemText>

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

      <FormStyled>
        {/* date when item was bought */}

        <StyledLabel htmlFor="dateAcquired">Date Acquired:</StyledLabel>
        <CellInputs
          onChange={(e) => setDateAcquired(e.target.value)}
          type="date"
          id="start"
          value={dateAcquired}
        ></CellInputs>

        {/* price at purchase of item */}

        <StyledLabel htmlFor="purchasedPrice">PurchasedPrice:</StyledLabel>
        <PriceInput
          onChange={(e) => setPurchasedPrice(e.target.value)}
          id="purchasedPrice"
          type="number"
          min="0.01"
          step="0.01"
          value={purchasedPrice}
        ></PriceInput>

        {/* notes for user comments */}

        <StyledLabel htmlFor="comment">Item description:</StyledLabel>
        <TextareaWrap>
          <Textarea
            onChange={(e) => setItemNotes(e.target.value)}
            maxlength="150"
            rows="4"
            cols="25"
            id="comment"
            value={itemNotes}
          ></Textarea>
        </TextareaWrap>

        <StyledLabel htmlFor="ItemCondition">Item Condition:</StyledLabel>
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

        <CenteredDiv>
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

          <SubmitLeftButton
            onClick={() => {
              submitInfo(submittedInfo);
            }}
            type="button"
          >
            Submit
          </SubmitLeftButton>
          <CancelRightButton
            type="button"
            onClick={() => {
              props.exitModal();
              clearForm();
            }}
          >
            Cancel
          </CancelRightButton>
        </CenteredDiv>
      </FormStyled>
    </CenteredDiv>
  );
};

export default AddItemForm;
