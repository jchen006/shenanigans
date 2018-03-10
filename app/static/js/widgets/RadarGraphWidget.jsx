import React from 'react'
import PropTypes from 'prop-types'
import Selector from '../components/core/Selector/Selector.jsx'
import RadarGraphComponent from '../components/d3Graphs/RadarGraph.jsx'

class RadarGraphWidget extends React.Component {

  componentWillMount() {
    //data will need to be updated it's just a mock right now before the update
    this.setState({
      data: {
        variables: [
          {key: 'resilience', label: 'Resilience'},
          {key: 'strength', label: 'Strength'},
          {key: 'adaptability', label: 'Adaptability'},
          {key: 'creativity', label: 'Creativity'},
          {key: 'openness', label: 'Open to Change'},
          {key: 'confidence', label: 'Confidence'},
        ],
        sets: [
          {
            key: 'me',
            label: 'My Scores',
            values: {
              resilience: 4,
              strength: 6,
              adaptability: 7,
              creativity: 2,
              openness: 8,
              confidence: 1,
            },
          },
          {
            key: 'everyone',
            label: 'Everyone',
            values: {
              resilience: 10,
              strength: 8,
              adaptability: 6,
              creativity: 4,
              openness: 2,
              confidence: 0,
            },
          },
        ],
      },
      selectedOption: '',
    })

    fetch("/api/ordered_recipes")
      .then(response => response.json())
      .then(data => {
        this.setState({
          options: this._mapRecipeSelection(data.ordered_recipes)
        })
      })
    }

  _mapRecipeSelection(ordered_recipes) {
    let mapped_recipes = []
    ordered_recipes.map((recipe_name, index) => {
      let recipe_obj = {
        label: recipe_name,
        value: index
      }
      mapped_recipes.push(recipe_obj)
    })
    console.log(mapped_recipes)
    return mapped_recipes
  }

  handleSelection(selectionOption) {
    let selectedOptions = this.state.selectOptions
    selectedOptions.push(selectionOption)
    this.setState({selectedOptions: selectedOptions})
  }

  renderRadarGraph() {
    return (
      <RadarGraphComponent
        width = { 500 }
        height = { 500 }
        padding = { 70 }
        domainMax = { 10 }
        highlighted = { null }
        onHover = { (point) => {
          console.log(point)
        }}
        data = { this.state.data }
      />
    )
  }

  renderSelector() {
    return (
      <Selector
        name="form-field-selection"
        onChange={this.handleSelection}
        options={this.state.options}
      />
    )
  }

  renderChart() {

  }

  render() {
    return (
      <div className="radar-graph-wiodget">
        { this.renderSelector() }
        { this.renderRadarGraph() }
        {/* { this.renderChart() } */}
      </div>
    )
  }
}

ReactDOM.render(
  <RadarGraphWidget
  />, document.getElementById("radar-graph-widget")
)