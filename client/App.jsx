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
          console.log(result.data);
          if (result.data.username && result.data.id) {
            console.log("about to change stuffs!");
            setLoggedIn({
              loggedIn: true,
              userName: result.data.username,
              userId: result.data.id,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Homepage
              colectionOwnerName={collectionOwnerName}
              setCollectionOwnerName={setCollectionOwnerName}
            />
          </Route>
          <Route path="/profile/:name">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <UserProfile collectionOwnerName={collectionOwnerName} userId={loggedIn.userId} />
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
