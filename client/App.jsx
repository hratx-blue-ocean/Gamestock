//test comment made by MA
import React from "react";
import ReactDOM from "react-dom";
<<<<<<< HEAD
<<<<<<< HEAD
import Homepage from "./components/Homepage.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";

{
  /* <Banner />; */
}

=======
import Homepage from "./components/Homepage/Homepage.jsx";
=======
import Homepage from "./Components/Homepage/Homepage.jsx";
>>>>>>> 9863a3fdd403541b4fd829af551e0b5143c754ec

// ReactDOM.render(<Homepage />, document.getElementById("root"));
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import { GlobalStyles } from "./Components/Core/coreStyles.jsx";

export default function App() {
  return (
    <div>
      <Homepage />
      <UserProfile />
      <GlobalStyles />
    </div>
  );
}

<<<<<<< HEAD
>>>>>>> eb01c7e497d0f28c53b775f10f52675b6cc9ca0b
// ReactDOM.render(<Homepage />, document.getElementById("root"));
ReactDOM.render(<UserProfile />, document.getElementById("root"));
=======
ReactDOM.render(<App />, document.getElementById("root"));
>>>>>>> 9863a3fdd403541b4fd829af551e0b5143c754ec
