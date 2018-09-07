import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'

class ClippedDrawer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props
    return (
      <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      >
        <div className={classes.toolbar} />
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Experiments" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Experiments" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Experiments" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Experiments" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Experiments" />
          </ListItem>
        <Divider />
      </Drawer>
    )
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default ClippedDrawer