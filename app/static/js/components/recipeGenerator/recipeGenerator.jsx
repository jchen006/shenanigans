import React, { PropTypes } from 'react'
import Slider from 'react-rangeslider'


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
    let headers = {
      method: "POST",
      body: {
        vector: this.state.sliders
      }
    }
    fetch(generateRecipeEndpoint, headers)
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
          return (<Slider
            min = {0}
            max = {10000}
            step = { 5 }
            value = { s }
            orientation = { "horizontal" }
            onChangeComplete = { this.handleOnSliderChange }
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
