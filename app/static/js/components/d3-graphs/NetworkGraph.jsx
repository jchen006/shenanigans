import React from 'react'
import { Graph } from 'react-d3-graph'
import PropTypes from 'prop-types'

class NetworkGraph extends React.Component {


  render() {
    return (
      <Graph
        id= {this.props.id }
        data = { this.props.data }
        config = { this.props.config }
      />
    )
  }
}


NetworkGraph.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
  id: PropTypes.string
}

export default NetworkGraph

