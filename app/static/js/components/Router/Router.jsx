import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "components/core/NavBar/NavBar";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
  }
}

export default Router;
