// parent component for user profile
import React, { useState, useEffect } from "react";
import axios from "axios";
import CollectionList from "./CollectionList.jsx";
import { useParams } from "react-router-dom";

const UserProfile = (props) => {
  // uses route parameter
  let { name } = useParams();

  const [collection, setCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(15);

  const getInfo = () => {
    axios
      .get(`/userProfile/name/${props.collectionOwnerName}`)
      .then((data) => {
        console.log("THIS IS DATA :", data);
        setCollection(data.data.rows);
      })
      .catch((err) => {
        console.error("Failure to get collection info on front end", err);
      });
  };

  const sortByTitle = () => {
    axios
      .get(`/userProfile/title/${props.collectionOwnerName}`)
      .then((data) => {
        setCollection(data.data.rows);
      })
      .catch((err) => {
        console.error("Failure to get title sort info on front end", err);
      });
  };

  const sortByPrice = () => {
    axios
      .get(`/userProfile/price/${props.collectionOwnerName}`)
      .then((data) => {
        setCollection(data.data.rows);
      })
      .catch((err) => {
        console.error("Failure to get collection info on front end", err);
      });
  };

  const sortByCondition = () => {
    axios
      .get(`/userProfile/condition/${props.collectionOwnerName}`)
      .then((data) => {
        setCollection(data.data.rows);
      })
      .catch((err) => {
        console.error("Failure to get collection info on front end", err);
      });
  };

  const sortByTradeable = () => {
    axios
      .get(`/userProfile/tradeable/${props.collectionOwnerName}`)
      .then((data) => {
        setCollection(data.data.rows);
      })
      .catch((err) => {
        console.error("Failure to get collection info on front end", err);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  let indexOflastCard = currentPage * cardsPerPage;
  let indexOfFirstCard = indexOflastCard - cardsPerPage;
  let currentCards = collection.slice(indexOfFirstCard, indexOflastCard);

  const handlePageClick = (e) => {
    setCurrentPage(e.target.value);
  };

  return (
    <div>
      <CollectionList
        sortByTitle={sortByTitle}
        sortByPrice={sortByPrice}
        sortByCondition={sortByCondition}
        sortByTradeable={sortByTradeable}
        collection={collection}
        currentCards={currentCards}
        cardsPerPage={cardsPerPage}
        handlePageClick={handlePageClick}
        userId={props.userId}
      />
    </div>
  );
};

export default UserProfile;
