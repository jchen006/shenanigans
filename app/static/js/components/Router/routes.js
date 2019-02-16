import React from "react";
import Home from "../Home/Home.jsx";
import About from "../About/About.jsx";
import Recipe from "../Recipe/Recipe.jsx";
import Experiments from "../Experiments/Experiments.jsx";
import NetworkGraph from "../NetworkGraph/NetworkGraph.jsx";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/about",
    component: () => <About />
  },
  {
    path: "/recipe_generation",
    component: () => <Recipe />
  },
  {
    path: "/experiments/:path",
    component: ({ match }) => <Experiments path={match.params.path} />
  },
  {
    path: "/graph",
    component: () => <NetworkGraph />
  }
];

export default routes;
