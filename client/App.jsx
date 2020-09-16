//test comment made by MA
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/header.jsx";
import Homepage from "./Components/Homepage/Homepage.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import { GlobalStyles } from "./Components/Core/coreStyles.jsx";
<<<<<<< HEAD
// drop this eventually
import ExampleModal from "./Components/Core/ExampleModal.jsx";
=======
import Header from "./Components/Header.jsx";
>>>>>>> Implement a header

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
<<<<<<< HEAD
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
=======
    <div>
      <Header />
      <Homepage />
      <UserProfile />
>>>>>>> Implement a header
      <GlobalStyles />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
