import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from '../src/components/Auth'


/**
 * @description: Wraps auth component 
 * @param {any} props 
 * @returns 
 */


function Home(props) {
  return (
    <div>
      <Auth props={props} />
    </div>
  );
}


/** 
 * @description: Render main component 
 */


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
