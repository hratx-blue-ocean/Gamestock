// parent component for user profile
import React, { useState, useEffect } from "react";
import axios from "axios";
import CollectionList from "./CollectionList.jsx";
import Paginator from "./Paginator.jsx";
import { useParams } from "react-router-dom";

const UserProfile = (props) => {
  // uses route parameter
  let { name } = useParams();

  const [collection, setCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);

  useEffect(() => {
    if (!collection.length) {
      axios
        .get(`/userProfile/${props.collectionOwnerName}`)
        .then((data) => {
          console.log("THIS IS DATA :", data);
          setCollection(data.data.rows);
        })
        .catch((err) => {
          console.error("Failure to get colleciton info on front end", err);
        });
    }
  }, []);

  // console.log("COLLECTION ACCESS? ", collection);

  // get currentposts
  let indexOflastCard = currentPage * cardsPerPage;
  let indexOfFirstCard = indexOflastCard - cardsPerPage;
  let currentCards = collection.slice(indexOfFirstCard, indexOflastCard);

  // loop through page #'s in pagination component
  // create a tags with lings for page numbers attached to click events
  // create function to change page and pass to pagination compoenent

  return (
    <div>
      <CollectionList collection={collection} currentCards={currentCards} />
      <Paginator collection={collection} cardsPerPage={cardsPerPage} />
    </div>
  );
};

export default UserProfile;
