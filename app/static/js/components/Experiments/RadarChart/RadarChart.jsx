import React from "react";
import Radar from "react-d3-radar";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

function inputComponent(props) {
  return <div ref={props.inputRef} {...props} />;
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
        data = data.ordered_recipes.map(r => ({ label: r }));
        this.setState({
          recipes: data
        });
      });
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
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };
    return (
      <div className={classes.root}>
        <Select
          classes={classes}
          styles={selectStyles}
          options={suggestions}
          components={components}
          value={this.state.recipe1}
          onChange={handleChange("recipe1")}
          placeholder="Search a country (start with a)"
          isClearable
        />
        <div className={classes.divider} />
        <Select
          classes={classes}
          styles={selectStyles}
          textFieldProps={{
            label: "Label",
            InputLabelProps: {
              shrink: true
            }
          }}
          options={suggestions}
          components={components}
          value={this.state.recipe2}
          onChange={this.handleChange("recipe2")}
          placeholder="Select multiple countries"
          isMulti
        />
      </div>
    );
    //   <Radar
    //     width={500}
    //     height={500}
    //     padding={70}
    //     domainMax={10}
    //     highlighted={null}
    //     onHover={point => {
    //       if (point) {
    //         console.log("hovered over a data point");
    //       } else {
    //         console.log("not over anything");
    //       }
    //     }}
    //     data={{
    //       variables: [
    //         { key: "resilience", label: "Resilience" },
    //         { key: "strength", label: "Strength" },
    //         { key: "adaptability", label: "Adaptability" },
    //         { key: "creativity", label: "Creativity" },
    //         { key: "openness", label: "Open to Change" },
    //         { key: "confidence", label: "Confidence" }
    //       ],
    //       sets: [
    //         {
    //           key: "me",
    //           label: "My Scores",
    //           values: {
    //             resilience: 4,
    //             strength: 6,
    //             adaptability: 7,
    //             creativity: 2,
    //             openness: 8,
    //             confidence: 1
    //           }
    //         },
    //         {
    //           key: "everyone",
    //           label: "Everyone",
    //           values: {
    //             resilience: 10,
    //             strength: 8,
    //             adaptability: 6,
    //             creativity: 4,
    //             openness: 2,
    //             confidence: 0
    //           }
    //         }
    //       ]
    //     }}
    //   />
  }
}

export default RadarChart;
