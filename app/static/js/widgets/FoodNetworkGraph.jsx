import NetworkGraph from "../components/d3-graphs/NetworkGraph.jsx";

class FoodNetworkGraph extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      config: {
        nodeHighlightBehavior: true,
        node: {
            color: 'lightgreen',
            size: 120,
            highlightStrokeColor: 'blue'
        },
        link: {
            highlightColor: 'lightblue'
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

  render() {
    return (
      <NetworkGraph
        config = { this.state.config }
        data = { this.state.data }
        id = { "food-network-graph" }
      />
    )
  }
}

ReactDOM.render(
  <FoodNetworkGraph
  />, document.getElementById("food-network-graph-container")
)