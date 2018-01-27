import React from 'react'
import WordCloud from '../components/d3Graphs/WordCloud.jsx'

class WordCloudWidget extends React.Component {

  componentWillMount() {
    fetch("/api/word_cloud_json/")
    .then(response => response.json())
    .then(data => {
        this.setState({
          ingredients: data
        })
      }
    )
  }

  render() {
    return (
      <div className="word-cloud-widget-container">
        <WordCloud
          num = { 100 }
          width = { 2000}
          height = { 1500 }
          words = { this.state.ingredients }
          domain = { [0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100] }
          range = { ["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]}
        />
      </div>
    )
  }

}

ReactDOM.render(<WordCloudWidget/>, document.getElementById('word_cloud') )