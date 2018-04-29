import { Graph } from 'react-d3-graph'

class FoodNetworkGraph extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      config: {
        "automaticRearrangeAfterDropNode": false,
        "height": 400,
        "highlightDegree": 1,
        "highlightOpacity": 1,
        "linkHighlightBehavior": false,
        "maxZoom": 8,
        "minZoom": 0.1,
        "nodeHighlightBehavior": false,
        "panAndZoom": false,
        "staticGraph": false,
        "width": 800,
        "node": {
          "color": "#d3d3d3",
          "fontSize": 8,
          "fontWeight": "normal",
          "highlightColor": "SAME",
          "highlightFontSize": 8,
          "highlightFontWeight": "normal",
          "highlightStrokeColor": "SAME",
          "highlightStrokeWidth": 1.5,
          "labelProperty": "name",
          "mouseCursor": "pointer",
          "opacity": 1,
          "renderLabel": true,
          "size": 200,
          "strokeColor": "none",
          "strokeWidth": 1.5,
          "svg": "",
          "symbolType": "circle"
        },
        "link": {
          "color": "#d3d3d3",
          "opacity": 1,
          "semanticStrokeWidth": false,
          "strokeWidth": 1.5,
          "highlightColor": "#d3d3d3"
        }
      },
      data: {
        nodes: [
          {id: 1, name: "chicken"},
          {id: 2, name: "broccoli"},
          {id: 3, name: "cabbage"},
          {id: 4, name: "strawberries"},
          {id: 5, name: "cream"},
          {id: 6, name: "butter"}
        ],
        links: [
          {source: 1, target: 2},
          {source: 2, target: 3},
          {source: 3, target: 6},
          {source: 1, target: 5},
          {source: 1, target: 6}
        ]
      }
    }
  }

  onClickNode(nodeId) {
    console.log(nodeId)
  }

  onClickLink(source, target) {
    console.log(source, target)
  }
  
  onMouseOverNode(nodeId) {
    console.log(nodeId)
  }

  onMouseOutNode(nodeId) {
    console.log(nodeId)
  }

  onMouseOverLink(source, target) {
    console.log(source, target)
  }

  onMouseOutLink(source, target) {
    console.log(source, target)
  }

  render() {
    return (
      <Graph
        config = { this.state.config }
        data = { this.state.data }
        id = { "food-network-graph" }
        onClickNode={ this.onClickNode.bind(this) }
        onClickLink={ this.onClickLink }
        onMouseOverNode={ this.onMouseOverNode.bind(this) }
        onMouseOutNode={ this.onMouseOutNode }
        onMouseOverLink={ this.onMouseOverLink }
        onMouseOutLink={ this.onMouseOutLink }
      />
    )
  }
}

ReactDOM.render(
  <FoodNetworkGraph
  />, document.getElementById("food-network-graph-container")
)