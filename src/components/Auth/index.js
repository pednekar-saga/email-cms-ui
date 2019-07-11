import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Login from "../Login";
import { getItem, setItem, removeItem } from "../../shared/store";
const Auth = ({ props }) => {
   const [loggedIn, setLoggedIn] = useState({ loggedIn: false });
   useEffect(() => {
      var query = queryString.parse(props.location.search);

      if (query.token) {
         setItem("token", query.token);
         setLoggedIn({
            loggedIn: true
         });
         props.history.push("/");
      }
      return;
   }, []);
   const logout = item => {
      setLoggedIn({
         loggedIn: false
      });
      removeItem(item);
      props.history.push("/");
   };
   return (
      <div>
         {loggedIn && getItem("token") ? (
            <div>
               <div>Logout Component </div>
               <button
                  onClick={() => {
                     logout("token");
                  }}
               >
                  Log out
               </button>
            </div>
         ) : (
            <Login />
         )}
      </div>
   );
};
export default Auth;
