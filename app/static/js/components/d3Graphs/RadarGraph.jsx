import React from 'react'
import PropTypes from 'prop-types'
import Radar from 'react-d3-radar';

class RadarGraphComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  handleHover(point) {
    console.log(point)
    this.props.onHover(point)
  }

  render() {
    return(
      <div className="radar-graph-container">
        <Radar
          width={ this.props.width }
          height={ this.props.height }
          padding={ this.props.padding }
          domainMax={ this.props.domainMax }
          highlighted={ this.props.highlighted }
          onHover={ (point) => { 
            if(point) {
              console.log("hovered")
              this.handleHover(point)
            } else {
              console.log("nothing")
            }
          }}
          data={ this.props.data }
        />
      </div>
    )
  }
}

RadarGraphComponent.propTypes = {
  data: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  domainMax: PropTypes.number,
  highlight: PropTypes.bool,
  onHover: PropTypes.func,
}

export default RadarGraphComponent

// {{
//   variables: [
//     {key: 'resilience', label: 'Resilience'},
//     {key: 'strength', label: 'Strength'},
//     {key: 'adaptability', label: 'Adaptability'},
//     {key: 'creativity', label: 'Creativity'},
//     {key: 'openness', label: 'Open to Change'},
//     {key: 'confidence', label: 'Confidence'},
//   ],
//   sets: [
//     {
//       key: 'me',
//       label: 'My Scores',
//       values: {
//         resilience: 4,
//         strength: 6,
//         adaptability: 7,
//         creativity: 2,
//         openness: 8,
//         confidence: 1,
//       },
//     },
//     {
//       key: 'everyone',
//       label: 'Everyone',
//       values: {
//         resilience: 10,
//         strength: 8,
//         adaptability: 6,
//         creativity: 4,
//         openness: 2,
//         confidence: 0,
//       },
//     },
//   ],
// }}