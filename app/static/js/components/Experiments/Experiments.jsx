import React from "react";
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
    this.state = {
      experiments: "ingredient_frequency"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  renderExperiment() {
    const { experiments } = this.state;
    if (experiments === "word_cloud") {
      return <WordCloud maxWidth={600} maxHeight={500} />;
    }
    return <IngredientFrequency maxWidth={600} maxHeight={500} />;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="experiments">Experiments</InputLabel>
            <Select
              value={this.state.experiments}
              onChange={this.handleChange}
              inputProps={{
                name: "experiments",
                id: "experiments"
              }}
            >
              {/* <MenuItem value={"radial_network_graph"}>Radial Network Graph</MenuItem>
                  <MenuItem value={"graph_page"}>Graph</MenuItem>
                  <MenuItem value={"ingredient_frequency"}>Ingredient Frequency</MenuItem>
                  <MenuItem value={"radar_graph"}>Radar Graph</MenuItem>
                  <MenuItem value={"lda_graph"}>LDA Graph</MenuItem>
                  <MenuItem value={"recipe_scatterplot"}>Recipe Scatterplot</MenuItem>
                  <MenuItem value={"word_cloud"}>Word Cloud</MenuItem>
                  <MenuItem value={"recipe_generator_vae"}>Recipe Generator</MenuItem> */}
              <MenuItem value={"ingredient_frequency"}>
                Ingredient Frequency
              </MenuItem>
              <MenuItem value={"word_cloud"}>Word Cloud</MenuItem>
            </Select>
          </FormControl>
        </form>
        {this.renderExperiment()}
      </div>
    );
  }
}

Experiments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Experiments);
