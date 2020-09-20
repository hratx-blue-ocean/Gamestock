// parent component for user profile
import React, { useState, useEffect } from "react";
import axios from "axios";
import CollectionList from "./CollectionList.jsx";
import { useParams } from "react-router-dom";
import { Wrapper } from "../Core/coreStyles.jsx";

const UserProfile = (props) => {
  // uses route parameter
  let { name } = useParams();

  const [collection, setCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(15);
  const [consoles, setConsoles] = useState([]);

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

  const getUserConsoles = () => {
    axios
      .get(`/consoles/userProfile/${props.collectionOwnerName}`)
      .then((consoles) => {
        setConsoles(() => consoles.data.rows);
        console.log("CONSOLES: ", consoles);
      })
      .catch((err) => {
        console.log("Error getting consoles: ", err);
      });
  };

  const getCollectionByConsole = (e) => {
    console.log("SELECT CHANGE: ", e.target.value);
    axios
      .get(`/userProfile/console/${props.collectionOwnerName}`, {
        params: {
          console: e.target.value,
        },
      })
      .then((consoleRecords) => {
        setCollection(consoleRecords.data.rows);
      })
      .catch((err) => {
        console.log("Front end console retrieval failure: ", err);
      });
  };

  useEffect(() => {
    getInfo();
  }, [props.collectionOwnerName]);

  let indexOflastCard = currentPage * cardsPerPage;
  let indexOfFirstCard = indexOflastCard - cardsPerPage;
  let currentCards = collection.slice(indexOfFirstCard, indexOflastCard);

  const handlePageClick = (e) => {
    setCurrentPage(e.target.value);
  };

  return (
    <div>
      <Wrapper>
        <div>Hello World</div>
      </Wrapper>
      <CollectionList
        sortByTitle={sortByTitle}
        sortByPrice={sortByPrice}
        sortByCondition={sortByCondition}
        sortByTradeable={sortByTradeable}
        collection={collection}
        setCollection={setCollection}
        currentCards={currentCards}
        cardsPerPage={cardsPerPage}
        handlePageClick={handlePageClick}
        collectionOwnerName={props.collectionOwnerName}
        userId={props.userId}
        getUserConsoles={getUserConsoles}
        getCollectionByConsole={getCollectionByConsole}
        consoles={consoles}
        loggedIn={props.loggedIn}
      />
    </div>
  );
};

export default UserProfile;
