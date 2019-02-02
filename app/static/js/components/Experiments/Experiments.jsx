import React from "react";
import NavBar from "components/core/NavBar/NavBar"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Experiments extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        experiment: 'radial_network_graph',
      };
    }


    render () {
      const { classes } = this.props;
      return (
        <NavBar>
          <div>
            <div> Experiments </div>
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="experiments">Experiments</InputLabel>
                <Select
                  value={this.state.experiment}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'experiments',
                    id: 'experiments',
                  }}
                >
                  <MenuItem value={"radial_network_graph"}>Radial Network Graph</MenuItem>
                  <MenuItem value={"graph_page"}>Graph</MenuItem>
                  <MenuItem value={"ingredient_frequency"}>Ingredient Frequency</MenuItem>
                  <MenuItem value={"radar_graph"}>Radar Graph</MenuItem>
                  <MenuItem value={"lda_graph"}>LDA Graph</MenuItem>
                  <MenuItem value={"recipe_scatterplot"}>Recipe Scatterplot</MenuItem>
                  <MenuItem value={"word_cloud"}>Word Cloud</MenuItem>
                  <MenuItem value={"recipe_generator_vae"}>Recipe Generator</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
        </NavBar>
      )
    }
}


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

Experiments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Experiments);
