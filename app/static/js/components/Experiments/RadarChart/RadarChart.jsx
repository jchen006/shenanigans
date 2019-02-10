import React from "react";
import Radar from "react-d3-radar";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function Control({ inputRef, ...props }) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

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
    console.log(prevState);
    if (current1 && current2) {
      if (
        prevRecipe1 &&
        prevRecipe2 &&
        prevRecipe1.id == current1.id &&
        prevRecipe2.id == current2.id
      ) {
        return;
      }
      console.log("fetching");
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
          const sets = data.map(d => ({
            key: "recipe",
            label: `Similarity between ${this.state.recipe1.label} and ${
              this.state.recipe2.label
            }`,
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
    const maxOfEachSet = sets.map(s =>
      Math.max(...variables.map(c => s.values[c.key]))
    );
    const max = Math.max(...maxOfEachSet);
    return (
      <Radar
        width={400}
        height={300}
        padding={70}
        domainMax={max}
        highlighted={null}
        onHover={point => {
          if (point) {
            console.log(point);
          }
        }}
        data={{
          variables: variables,
          sets: sets
        }}
      />
    );
  }

  render() {
    const handleChange = name => value => {
      this.setState({
        [name]: value
      });
    };

    const { classes, theme } = this.props;

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
            isClearable
          />
        </div>
        {this.renderRadar()}
      </div>
    );
  }
}

export default withStyles(styles)(RadarChart);
