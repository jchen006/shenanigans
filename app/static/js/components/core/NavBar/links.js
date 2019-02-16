import React from "react";
import PenIcon from "@material-ui/icons/Edit";
import NoteIcon from "@material-ui/icons/Note";
import HomeIcon from "@material-ui/icons/Home";

export default [
  {
    text: "Home",
    route: "/",
    icon: () => <HomeIcon />
  },
  {
    text: "Recipe Generation",
    route: "/recipe_generation",
    icon: () => <NoteIcon />
  },
  {
    text: "Experiments",
    route: "/experiments",
    icon: () => <PenIcon />
  },
  {
    text: "Graph",
    route: "/graph"
  }
];
