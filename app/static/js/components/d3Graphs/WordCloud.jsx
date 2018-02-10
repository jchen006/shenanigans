import React from 'react'
import PropTypes from 'prop-types'
import WordCloud from 'react-d3-cloud'

class WordCloudComponent extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="word-cloud-container">
          <WordCloud
            data={this.props.data}
            width={this.props.width}
            height={this.props.height}
            padding = {this.props.padding}
          />
      </div>
    )}
}

WordCloudComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  padding: PropTypes.number
}

export default WordCloudComponent