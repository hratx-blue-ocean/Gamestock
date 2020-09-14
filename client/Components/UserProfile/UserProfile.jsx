// parent component for user profile
import React from "react";
import Header from "./Header.jsx";
import AddItem from "./AddItem.jsx"; //add item to modal form
import Middle from "./Middle.jsx";
import Pagination from "./Pagination.jsx";


const UserProfile = () => {
  return <div>
    <Header />
    <AddItem />
    <Middle />
    <Pagination />

  </div>
}

export default UserProfile;