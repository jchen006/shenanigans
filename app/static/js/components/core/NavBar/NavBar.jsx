import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBarStyles from "./NavBarStyles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import links from "./links";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle(open) {
    this.setState({ open: open });
  }

  render() {
    const { classes } = this.props;
    const handleDrawerOpen = () => this.handleDrawerToggle(true);
    const handleDrawerClose = () => this.handleDrawerToggle(false);
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.nav}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Shenanigans
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
          open={this.state.open}
          onClose={handleDrawerClose}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
          >
            <List>
              {links.map((link, i) => {
                return (
                  <ListItem key={i} button component={Link} to={link.route}>
                    <ListItemIcon>{link.icon()}</ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <List>
              <ListItem button component={Link} to="/about">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"About Us"} />
              </ListItem>
            </List>
          </div>
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
