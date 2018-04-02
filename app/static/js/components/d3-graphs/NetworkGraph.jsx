import React from 'react'
import { Graph } from 'react-d3-graph'
import PropTypes from 'prop-types'

class NetworkGraph extends React.Component {

  handleOnClickNode(nodeId) {
    this.props.onClickNode(nodeId)
  };

  handleOPnMouseOverNode(nodeId) {
    this.props.onMouseOverNode(nodeId)
  };

  handleOnMouseOutNode(nodeId) {
    this.props.onMouseOutNode(nodeId)
  };

  handleOnClickLink(source, target) {
    this.props.onClickLink(source, target)
  };

  handleOnMouseOverLink(source, target) {
    this.props.onMouseOverLink(source, target)
  };

  handleOnMouseOutLink(source, target) {
    this.props.onMouseOutLink(source, target)
  };


  render() {
    return (
      <Graph
        id= {this.props.id }
        data = { this.props.data }
        config = { this.props.config }
        onClickNode={ this.handleOnClickNode }
        onClickLink={ this.handleOnClickLink }
        onMouseOverNode={ this.handleOnMouseOverNode }
        onMouseOutNode={ this.handleOnMouseOutNode }
        onMouseOverLink={ this.handleOnMouseOverLink }
        onMouseOutLink={ this.handleOnMouseOutLink }
      />
    )
  }
}


NetworkGraph.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
  id: PropTypes.string,
  onClickNode: PropTypes.func,
  onClickLink: PropTypes.func,
  onMouseOverNode: PropTypes.func,
  onMouseOutNode: PropTypes.func,
  onMouseOverLink: PropTypes.func,
  onMouseOutLink: PropTypes.func
}

export default NetworkGraph

