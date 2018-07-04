import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './NavBarStyles.js'

class NavBar extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={"app-bar"}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Shenanigans
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

const ShenanigansAppBar = withStyles(styles)(NavBar)
ReactDOM.render(<ShenanigansAppBar/>, document.getElementById("nav-bar"))

