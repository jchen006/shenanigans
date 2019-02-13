import { schemeCategory10, schemePastel1 } from "d3-scale-chromatic";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  selectionRoot: {
    marginLeft: 36,
    marginRight: 36
  },
  input: {
    display: "flex",
    padding: 0
  },
  underline1: {
    "&:hover:before": {
      borderBottomColor: [schemeCategory10[0], "!important"]
    },
    "&:after": {
      borderBottomColor: schemeCategory10[0]
    },
    "&:before": {
      borderBottomColor: schemePastel1[1]
    }
  },
  underline2: {
    "&:hover:before": {
      borderBottomColor: [schemeCategory10[1], "!important"]
    },
    "&:after": {
      borderBottomColor: schemeCategory10[1]
    },
    "&:before": {
      borderBottomColor: schemePastel1[4]
    }
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 4
  },
  radarGrid: {
    display: "flex",
    alignContent: "center"
  },
  radarChart: {
    width: "50%"
  }
});

export default styles;
