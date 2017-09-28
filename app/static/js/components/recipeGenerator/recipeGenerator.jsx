import React, { PropTypes } from 'react'
import InputRange from 'react-input-range'


const RecipeGenerator = React.createClass({
  propTypes: {
    numSliders: PropTypes.number
  },

  getInitialState() {
    return {
      sliders: this.defaultSliders(),
      recipe: []
    }
  },

  defaultSliders() {
    return new Array(this.props.numSliders).fill(0)
  },

  generateRecipeService() {
    let generateRecipeEndpoint = "/api/create_recipe"
    var data = {
      "vector": this.state.sliders
    }  
    console.log(data)
    let fetchData = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    }

    fetch(generateRecipeEndpoint, fetchData)
      .then(response => response.json())
      .then( data => {
        this.setState({
          recipes : data
        })
      })
  },

  handleOnSliderChangeComplete(index, value) {
    let updated_sliders = this.state.sliders
    updated_sliders[index] = value
    this.setState({
      sliders: updated_sliders
    }, this.generateRecipeService())
  },

  handleChangeComplete() {
    console.log("done")
  },

  // renderSliders() {
  //   return (
  //     <div className='slider'>
  //      <Slider
  //         min={0}
  //         max={100}
  //         value={10}
  //         onChangeComplete={this.handleChangeComplete}
  //       />
  //     </div>
  //   )
  // },

  renderSliders() {
    return (
      <div className="sliders">
        { this.state.sliders.map((s, index) => {
          return (<InputRange
            minValue = {0}
            maxValue = {10000}
            step = { 5 }
            value = { s }
            orientation = { "horizontal" }
            onChange = { (value) => {
              this.handleOnSliderChangeComplete(index, value)
            }}
          />)
        })}
      </div>
    )
  },

  render() {
    return (
      <div className="recipeGenerator">
        { this.renderSliders() }
      </div>
    )
  }
})

export default RecipeGenerator


if(document.getElementById("recipe_generator")) {
    ReactDOM.render(
    <RecipeGenerator 
      numSliders = {10}
    />, document.getElementById("recipe_generator")
  )
}
