import React, { PropTypes } from 'react'

const TabHeader = React.createClass({

  propTypes: {
    tabs: PropTypes.object
  },

  render() {
    return (
      <div className="container">
        <div className="col-sm-8">
          <ul className="nav nav-tabs">
            { this.props.tabs.map((tab, index) => {
                return (
                  <li className={ index == 0 ? "active" : ""}>
                    <a href= {tab.link} data-toggle="tab">
                      { tab.name }
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
})

export default TabHeader