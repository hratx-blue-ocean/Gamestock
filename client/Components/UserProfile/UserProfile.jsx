// parent component for user profile
import React, { useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    console.log("!!!!!!!!!!!!!!");
    if (!collection.length) {
      axios
        .get(`/userProfile/${props.collectionOwnerName}`)
        .then((data) => {
          console.log("THIS IS DATA :", data);
          setCollection(data.data.rows);
        })
        .catch((err) => {
          console.log("Failure to get colleciton info on front end");
          console.error(err);
        });
    }
  }, []);

  return (
    <div>

      <CollectionList collection={collection} />
      <Paginator collection={collection} />
    </div>
  );
};
//
export default UserProfile;
