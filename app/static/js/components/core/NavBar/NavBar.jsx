import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ClippedDrawer from './ClippedDrawer.jsx'
import { withStyles } from '@material-ui/core/styles'
import { NavBarstyles } from './NavBarStyles.js'

class NavBar extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <ClippedDrawer classes={classes}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
      </main>
    </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

const ShenanigansAppBar = withStyles(NavBarstyles)(NavBar)
ReactDOM.render(<ShenanigansAppBar/>, document.getElementById("nav-bar"))

