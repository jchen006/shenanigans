import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import PenIcon from '@material-ui/icons/Edit';
import NoteIcon from '@material-ui/icons/Note';
import HomeIcon from '@material-ui/icons/Home'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBarStyles from './NavBarStyles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class NavBar extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.nav}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Shenanigans
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" className={classes.drawer} anchor="left" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.toolbar} />
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem button component={Link} to="/recipe_generation">
              <ListItemIcon><NoteIcon /></ListItemIcon>
              <ListItemText primary={"Recipe Generation"} />
            </ListItem>
          <ListItem button component={Link} to="/experiments">
              <ListItemIcon><PenIcon /></ListItemIcon>
              <ListItemText primary={"Experiments"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} to="/about">
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary={"About Us"} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
        
      </div>
    );
  } 
}


NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default withStyles(NavBarStyles)(NavBar);