//test comment made by MA
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./Components/Homepage/Homepage.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import { GlobalStyles } from "./Components/Core/coreStyles.jsx";

// drop this eventually
import ExampleModal from "./Components/Core/ExampleModal.jsx";

export default function App() {
  return (
    <>
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
