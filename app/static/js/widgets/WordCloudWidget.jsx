import React from 'react'
import WordCloudComponent from '../components/d3Graphs/WordCloud.jsx'

class WordCloudWidget extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ingredients : []
    }
  }

  componentWillMount() {
    fetch("/api/word_cloud_json/100")
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
        <WordCloudComponent
          width = { 1500 }
          height = { 1000 }
          data = { this.state.ingredients }
          padding = {0}
        />
      </div>
    )
  }

}

ReactDOM.render(<WordCloudWidget/>, document.getElementById('word_cloud'))