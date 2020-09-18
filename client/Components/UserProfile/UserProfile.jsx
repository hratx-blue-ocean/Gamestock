// parent component for user profile
import React, { useState, useEffect } from "react";
import axios from "axios";
import CollectionList from "./CollectionList.jsx";
import Paginator from "./Paginator.jsx";
import Message from './Message.jsx'
import { useParams } from "react-router-dom";

const UserProfile = (props) => {
  // uses route parameter
  let { name } = useParams();

  const [collection, setCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  useEffect(() => {
    if (!collection.length) {
      axios
        .get(`/userProfile/${props.collectionOwnerName}`)
        .then((data) => {
          console.log("THIS IS DATA :", data);
          setCollection(data.data.rows || []);
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

  const handlePageClick = (e) => {
    setCurrentPage(e.target.value);
  };

  // sort by title
  const titleSort = () => {
    if (collection.length) {
      console.log(
        "TITLE SORT CLICKED: ",
        collection.sort((a, b) => a.title - b.title)
      );
      // return collection.sort((a, b) => a.title - b.title);
    }
  };

  // sort by price
  const priceSort = () => {
    if (collection.length) {
      console.log("PRICE SORT CLICKED");
      return collection.sort((a, b) => a.starting_price - b.starting_price);
    }
  };

  // sort by condition
  const conditionSort = () => {
    if (collection.length) {
      console.log("CONDITION SORT CLICKED");
      return collection.sort((a, b) => a.condition - b.condition);
    }
  };

  // sort by trade status
  const tradeSort = () => {
    if (collection.length) {
      console.log("TRADE SORT CLICKED");
      return collection.sort((a, b) => a.tradeable - b.tradeable);
    }
  };

  return (
    <div>
      <CollectionList
        collection={collection}
        currentCards={currentCards}
        titleSort={titleSort}
        priceSort={priceSort}
        conditionSort={conditionSort}
        tradeSort={tradeSort}
        collection={collection}
        cardsPerPage={cardsPerPage}
        handlePageClick={handlePageClick}
        userId={props.userId}
      />
    </div>
  );
};

export default UserProfile;
