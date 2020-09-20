import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { StyledInput, StyledButton } from "../Core/coreStyles.jsx";

const StyledSearchBar = styled(StyledInput)`
  background-color: lightgray;
  min-width: 300px;
  padding: 5px 10px;
  margin-bottom: 5px;
`;

const SearchButton = styled(StyledButton)`
  padding: 8px 10px;
  margin-bottom: 5px;
`;

const NewItemSearchBar = ({ getSearchedItems }) => {
  // items stores a list of games sent by the API
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // Function to make an axios request to get data from API/server
  const getItems = (item) => {
    axios
      .get(`/getItemPrice`, {
        // Sends the search value to the server
        params: {
          items: item,
        },
      })
      // .then((res) => {
      //   // console.log(res)
      //   return res;
      // })
      .then((res) => {
        setItems(res.data);
        //   return res;
        // })
        // .then((res) => {
        getSearchedItems(res.data);
      })
      .catch((err) => {
        console.log("Error getitng data from the server", err);
      });
  };

  return (
    <div>
      <br></br>
      <StyledSearchBar
        type="text"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <SearchButton onClick={() => getItems(input)}>Search</SearchButton>
      <br></br>
    </div>
  );
};

export default NewItemSearchBar;
