import React from "react";
import Home from "../Home/Home.jsx";
import About from "../About/About.jsx";
import Recipe from "../Recipe/Recipe.jsx";
import Experiments from "../Experiments/Experiments.jsx";
import Admin from "components/admin/Admin"
import Login from "components/admin/Login/Login"

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    private: false
  },
  {
    path: "/about",
    component: () => <About />,
    private: false
  },
  {
    path: "/recipe_generation",
    component: () => <Recipe />,
    private: false
  },
  {
    path: "/experiments/:path",
    component: ({ match }) => <Experiments path={match.params.path} />,
    private: false
  },
  {
    path: "/login",
    component: () => <Login />,
    private: false
  },
  {
    path: "/admin/:params",
    component: ({ match }) => <Admin path={match.params.path}/>,
    private: true
  }
];

export default routes;
