//test comment made by MA
import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./components/Homepage/Homepage.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import { GlobalStyles } from "./components/Core/coreStyles.jsx";

export default function App() {
  return (
    <div>
      <Homepage />
      <UserProfile />
      <GlobalStyles />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
