import React from "react";
import NavBar from "components/core/NavBar/NavBar"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IngredientFrequency from './IngredientFrequency/IngredientFrequencyBarChart'
import WordCloud from './WordCloud/WordCloud'

class Experiments extends React.Component {

    constructor(props) {
      super(props);
    }

    renderExperiment() {
			const { match } = this.props
			let path = match.params.path
      switch(path) {
				case 'word_cloud':
					return <WordCloud maxWidth={600} maxHeight={500} />
				default:
					return <IngredientFrequency maxWidth={600} maxHeight={500} />
      }
		}

    render () {
      const { classes } = this.props;
      return (
        <NavBar>
          <div>
            {this.renderExperiment()}
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
