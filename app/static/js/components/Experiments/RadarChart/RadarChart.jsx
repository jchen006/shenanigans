import React from "react";
import Radar from "react-d3-radar";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import components from "./AutoCompleteComponents";
import Grid from "@material-ui/core/Grid";

class RadarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], hasError: false, recipe1: null, recipe2: null };
  }

  componentWillMount() {
    fetch("/api/ordered_recipes")
      .then(response => response.json())
      .then(data => {
        data = data.ordered_recipes.map((r, i) => ({ label: r, id: i }));
        this.setState({
          recipes: data
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { recipe1: prevRecipe1, recipe2: prevRecipe2 } = prevState;
    const { recipe1: current1, recipe2: current2 } = this.state;
    if (current1 && current2) {
      if (
        prevRecipe1 &&
        prevRecipe2 &&
        prevRecipe1.id == current1.id &&
        prevRecipe2.id == current2.id
      ) {
        return;
      }
      fetch(`/api/radar_graph?recipe1=${current1.id}&recipe2=${current2.id}`)
        .then(response => response.json())
        .then(data => {
          data = data.dists;
          const variables = [
            { key: "cluster 0", label: "Cluster 0" },
            { key: "cluster 1", label: "Cluster 1" },
            { key: "cluster 2", label: "Cluster 2" },
            { key: "cluster 3", label: "Cluster 3" },
            { key: "cluster 4", label: "Cluster 4" },
            { key: "cluster 5", label: "Cluster 5" },
            { key: "cluster 6", label: "Cluster 6" },
            { key: "cluster 7", label: "Cluster 7" },
            { key: "cluster 8", label: "Cluster 8" },
            { key: "cluster 9", label: "Cluster 9" }
          ];
          const sets = data.map((d, i) => ({
            key: i,
            label: this.state[`recipe${i + 1}`],
            values: d.reduce((acc, c) => {
              acc[c.axis] = parseFloat(c.value) * 10;
              return acc;
            }, {})
          }));
          this.setState({
            radar: { sets, variables }
          });
        });
    }
  }

  renderRadar() {
    if (!this.state.radar) {
      return;
    }
    const { sets, variables } = this.state.radar;
    const { classes } = this.props;
    const maxOfEachSet = sets.map(s =>
      Math.max(...variables.map(c => s.values[c.key]))
    );
    const max = Math.max(...maxOfEachSet);
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.radarGrid}
      >
        <Grid item className={classes.radarChart}>
          <Radar
            width={400}
            height={300}
            padding={40}
            domainMax={max}
            highlighted={null}
            data={{
              variables: variables,
              sets: sets
            }}
          />
        </Grid>
      </Grid>
    );
  }

  render() {
    const handleChange = name => value => {
      if (value) {
        this.setState({
          [name]: value
        });
      } else {
        this.setState({
          [name]: value,
          radar: undefined
        });
      }
    };

    const { classes } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        "& input": {
          font: "inherit"
        }
      })
    };
    return (
      <div className={classes.root}>
        <div className={classes.selectionRoot}>
          <Select
            classes={classes}
            styles={selectStyles}
            options={this.state.recipes}
            components={components}
            value={this.state.recipe1}
            onChange={handleChange("recipe1")}
            placeholder="Choose a recipe for the first item"
            underline={classes.underline1}
            isClearable
          />
          <div className={classes.divider} />
          <Select
            classes={classes}
            styles={selectStyles}
            options={this.state.recipes}
            components={components}
            value={this.state.recipe2}
            onChange={handleChange("recipe2")}
            placeholder="Choose a recipe for the second item"
            underline={classes.underline2}
            isClearable
          />
        </div>
        {this.renderRadar()}
      </div>
    );
  }
}

export default withStyles(styles)(RadarChart);
