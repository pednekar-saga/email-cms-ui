import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getItem, setItem, removeItem } from "./shared/store";
import queryString from "query-string";
import Auth from "./components/Auth";
function App(props) {
   return (
      <div className="App">
         <Auth props={props} />
      </div>
   );
}

export default App;
