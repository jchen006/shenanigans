import React, { PropTyes } from 'react'

const TabPanel = React.createClass({

  propTypes: {
    isActive: PropTypes.bool,
    id: PropTypes.string
  },

  isActivePanel() {
    return isActive ? "tab-pane active" : ""
  },

  render() {
    return (
      <div className= {this.isActivePanel} id={this.props.id}>
        { this.props.children }
      </div>
    )
  }
})

export default TabPanel