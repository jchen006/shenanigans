import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IngredientFrequency from "./IngredientFrequency/IngredientFrequencyBarChart";
import WordCloud from "./WordCloud/WordCloud";
import RadarChart from "./RadarChart/RadarChart";
import styles from "./styles";
import routes from "../enums/experimentRoutes.js";

class Experiments extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  renderExperiment() {
    const { path } = this.props;
    let component;
    switch (path) {
      case routes.WORD_CLOUD:
        component = <WordCloud maxWidth={600} maxHeight={500} />;
        break;
      case routes.RADAR_CHART:
        component = <RadarChart />;
        break;
      case routes.INGREDIENT_FREQUENCY:
      default:
        component = <IngredientFrequency maxWidth={600} maxHeight={500} />;
        break;
    }
    return component;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    return <div>{this.renderExperiment()}</div>;
  }
}

Experiments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Experiments);
