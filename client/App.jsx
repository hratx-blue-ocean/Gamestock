//test comment made by MA
import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./Components/Homepage/Homepage.jsx";

// ReactDOM.render(<Homepage />, document.getElementById("root"));
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import { GlobalStyles } from "./components/Core/coreStyles.jsx";
import ExampleModal from "./components/Core/ExampleModal.jsx";

export default function App() {
  return (
    <div>
      <ExampleModal />
      <Homepage />
      <UserProfile />
      <GlobalStyles />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
