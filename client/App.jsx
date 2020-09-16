import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Homepage from "./Components/Homepage/Homepage.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import { GlobalStyles } from "./Components/Core/coreStyles.jsx";
// drop this eventually
import ExampleModal from "./Components/Core/ExampleModal.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState({
    loggedIn: false,
    userName: "",
    userId: 0,
  });
  useEffect(() => {
    if (!loggedIn.loggedIn) {
      axios.get("/checkLoginStatus").then((result) => {
        console.log(result.data);
        if (result.data.username && result.data.id) {
          console.log("about to change stuffs!");
          setLoggedIn({
            loggedIn: true,
            userName: result.data.username,
            userId: result.data.id,
          });
        }
      });
    }
  });

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/user/:name">
            <UserProfile />
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
