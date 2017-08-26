import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap';

const InfoPanel = React.createClass({

  propTypes: {
    /**
     * An object containing any set of informaton
     */
    info: PropTypes.shape({
      text: PropTypes.string,
      size: PropTypes.number
    })
  },
  
  render() {
    return (
      <div>
        <Panel header= {this.props.text} bsStyle="info">
          The total number of recipes this appears in is {this.props.size}
        </Panel>
        />
      </div>
    )
  }
})

export default InfoPanel