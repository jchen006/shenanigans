import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "components/core/NavBar/Navbar";

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
      </Router>
    );
  }
}

export default AppRouter;
