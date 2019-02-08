import React from "react";
import PropTypes from "prop-types";
import { Panel } from "react-bootstrap";

class IngredientsCard extends React.Component {
  constructor(props) {
    super(props);
  }

  createList() {
    var ingredients = this.props.ingredients;
    return ingredients.join(", ");
  }

  render() {
    const title = <h3> Recipe </h3>;
    return (
      <div>
        <Panel header={title}>{this.createList()}</Panel>
      </div>
    );
  }
}

IngredientsCard.propTypes = {
  ingredients: PropTypes.array
};

export default IngredientsCard;
