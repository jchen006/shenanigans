import React, {PropTypes} from 'react'

const List = React.createClass({
  propTypes: {
    recipe: PropTypes.array
  },

  getInitialState() {
    return {
      recipes: this.props.recipes
    }
  },

  render() {

  }

})

export default List