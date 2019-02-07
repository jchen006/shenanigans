import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "components/Home/home";
import About from "components/About/About";
import Recipe from "components/Recipe/Recipe";
import Experiments from "components/Experiments/Experiments";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/recipe_generation" component={Recipe} />
          <Route path="/experiments" component={Experiments} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
