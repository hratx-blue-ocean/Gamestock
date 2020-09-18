import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Homepage from "./Components/Homepage/Homepage.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import { GlobalStyles } from "./Components/Core/coreStyles.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState({
    loggedIn: false,
    userName: "",
    userId: 0,
    userAvatar: "",
  });

  const [collectionOwnerName, setCollectionOwnerName] = useState("");
  useEffect(() => {
    console.log("COLLECTION OWNER IS:", collectionOwnerName);
  }, [collectionOwnerName]);

  useEffect(() => {
    if (!loggedIn.loggedIn) {
      axios
        .get("/checkLoginStatus")
        .then((result) => {
          if (result.data.username && result.data.id) {
            setLoggedIn({
              loggedIn: true,
              userName: result.data.username,
              userId: result.data.id,
              userAvatar: result.data.avatar,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  // console.log("USERNAME: ", loggedIn.userName);

  return (
    <>
      <Router>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <Route exact path="/">
            <Homepage
              colectionOwnerName={collectionOwnerName}
              setCollectionOwnerName={setCollectionOwnerName}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route path="/profile/:name">
            <UserProfile collectionOwnerName={collectionOwnerName} />
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
