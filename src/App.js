import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getItem, setItem } from "./shared/store";
import queryString from "query-string";
function App(props) {
   const [loggedIn, setLoggedIn] = useState({ loggedIn: false });

   useEffect(() => {
      var query = queryString.parse(props.location.search);
      if (query.token) {
         setItem("token", query.token);
         setLoggedIn({
            loggedIn: true
         });
      }
      return;
   }, []);

   return (
      <div className="App">
         {loggedIn && getItem("token") ? (
            <div>Logout Component </div>
         ) : (
            <Login />
         )}
      </div>
   );
}

export default App;
