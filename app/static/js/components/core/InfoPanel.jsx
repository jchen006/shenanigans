import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap';

const InfoPanel = React.createClass({

  propTypes: {
    /**
     * An object containing any set of informaton,
     * for now contains text and size
     */
    info: PropTypes.shape({
      text: PropTypes.string,
      size: PropTypes.number
    })
  },
  
  render() {
    return (
      <div>
        <Panel header= {this.props.info.text} bsStyle="info">
          The total number of recipes this appears in is {this.props.info.size}
        </Panel>
      </div>
    )
  }
})

export default InfoPanel