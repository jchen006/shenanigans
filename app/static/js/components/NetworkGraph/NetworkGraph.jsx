import { Graph } from "react-d3-graph";
import ReactLoading from "react-loading";
import React from "react";
import LoadingSpinner from "../core/LoadingSpinner/LoadingSpinner.jsx";

class NetworkGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.config = {
      height: 800,
      panAndZoom: false,
      staticGraph: false,
      width: 800,
      node: {
        color: "#d3d3d3",
        fontSize: 8,
        fontWeight: "normal",
        highlightColor: "SAME",
        highlightFontSize: 8,
        highlightFontWeight: "normal",
        highlightStrokeColor: "SAME",
        highlightStrokeWidth: 1.5,
        labelProperty: "name",
        mouseCursor: "pointer",
        opacity: 1,
        renderLabel: true,
        size: 200,
        strokeColor: "none",
        strokeWidth: 1.5,
        svg: "",
        symbolType: "circle"
      },
      link: {
        opacity: 1,
        semanticStrokeWidth: false,
        strokeWidth: 1.5,
        highlightColor: "#d3d3d3"
      }
    };
    this.onClickNode = this.onClickNode.bind(this);
    this.onClickLink = this.onClickLink.bind(this);
    this.onMouseOverNode = this.onMouseOverNode.bind(this);
    this.onMouseOutNode = this.onMouseOutNode.bind(this);
    this.onMouseOverLink = this.onMouseOverLink.bind(this);
    this.onMouseOutLink = this.onMouseOutLink.bind(this);
  }

  componentWillMount() {
    fetch("/api/graph")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          data: data
        });
      });
  }

  onClickNode(nodeId) {}

  onClickLink(source, target) {}

  onMouseOverNode(nodeId) {}

  onMouseOutNode(nodeId) {}

  onMouseOverLink(source, target) {}

  onMouseOutLink(source, target) {}

  renderGraph() {
    return (
      <Graph
        config={this.config}
        data={this.state.data}
        id={"food-network-graph"}
        onClickNode={this.onClickNode}
        onClickLink={this.onClickLink}
        onMouseOverNode={this.onMouseOverNode}
        onMouseOutNode={this.onMouseOutNode}
        onMouseOverLink={this.onMouseOverLink}
        onMouseOutLink={this.onMouseOutLink}
      />
    );
  }

  renderLoading() {
    return <LoadingSpinner />;
  }

  render() {
    return (
      <div>{this.state.data ? this.renderGraph() : this.renderLoading()}</div>
    );
  }
}

export default NetworkGraph;