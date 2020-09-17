// parent component for user profile
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddItem from "./AddItem.jsx"; //add item to modal form
import CollectionList from "./CollectionList.jsx";
import Paginator from "./Paginator.jsx";
import { useParams } from "react-router-dom";

const UserProfile = (props) => {
  // uses route parameter
  let { name } = useParams();
  console.log("THIS VAR IS ONLY USABLE BY REACT-ROUTER: ", name);

  console.log(
    "THIS ONE SHOULD MATCH BROWSER ROUTER: ",
    props.collectionOwnerName
  );
  const [collection, setCollection] = useState([]);
  // useState to store the array of returned data from items table
  // const [items, setItems] = useState([]);
  // useState to store the array of returned data from items_value_by_date
  // const [prices, setPrices] = useState([]);
  // useState to store the array of returned data from items_in_collection
  // const [collections, setCollections] = useState([]);

  useEffect(() => {
    console.log("!!!!!!!!!!!!!!");
    axios
      .get(`/userProfile/${props.collectionOwnerName}`)
      .then((data) => {
        console.log("THIS IS DATA :", data);
        setCollection(data);
      })
      .catch((err) => {
        console.log("Failure to get colleciton info on front end");
        console.error(err);

        // axios.get("/userProfile/items").then((data) => {
        //   console.log("ITEMS: ", data);
        //   setItems(data);
        // });

        // axios.get("/userProfile/prices").then((data) => {
        //   console.log("PRICES: ", data);
        //   setPrices(data);
        // });

        // axios.get("/userProfile/collectionItems").then((data) => {
        //   console.log("COLLECTIONS: ", data);
        //   setCollections(data);
        // });
      });
  }, []);

  return (
    <div>
      <h2>UserProfile</h2>
      <AddItem />
      <CollectionList collection={collection} />
      <Paginator />
    </div>
  );
};

export default UserProfile;
