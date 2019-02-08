import React from "react";
import NavBar from "components/core/NavBar/NavBar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IngredientFrequency from "./IngredientFrequency/IngredientFrequencyBarChart";
import WordCloud from "./WordCloud/WordCloud";
import styles from "./styles";

class Experiments extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  renderExperiment() {
    const { path } = this.props;
    switch(path) {
      case 'word_cloud':
        return <WordCloud maxWidth={600} maxHeight={500} />;
      default:
        return <IngredientFrequency maxWidth={600} maxHeight={500} />;
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <NavBar>
        <div>
          {this.renderExperiment()}
        </div>
      </NavBar>
    );
  }
}

Experiments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Experiments);
