import React, { PropTypes } from 'react'
import InputRange from 'react-input-range'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import RangeSlider from '../core/RangeSlider/RangeSlider.jsx'

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
    var requestData = {
      "vector": this.state.sliders
    }  
    console.log(requestData)
    let fetchData = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(requestData)
    }

    fetch(generateRecipeEndpoint, fetchData)
      .then(response => response.json())
      .then( data => {
        this.setState({
          recipe : data.Recipe
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

  renderSliders() {
    const minValue = 0
    const maxValue = 10000
    const step = 5
    return (
      <div className="sliders">
        { this.state.sliders.map((s, index) => {
          return (
            <RangeSlider
            rangeType = "range-primary"
            min = {minValue}
            max = {maxValue}
            step = { step }
            value = { s }
            onChange = { (event) => {
              const value = parseInt(event.target.value)
              this.handleOnSliderChangeComplete(index, value)
            }}
          />)
        })}
      </div>
    )
  },

  renderRecipes() {
    console.log(this.state.recipe)
    return (
      <div className="suggested-recipes">
        <ListGroup>
          { this.state.recipe.map((ingredient) => {
            console.log(ingredient)
            return (
              <ListGroupItem> 
                { ingredient } 
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  },

  render() {
    return (
      <div className="recipeGenerator">
        { this.renderSliders() }
        { this.renderRecipes() }
      </div>
    )
  }
})

export default RecipeGenerator

ReactDOM.render(
  <RecipeGenerator 
    numSliders = {10}
  />, document.getElementById("recipe-generator")
)