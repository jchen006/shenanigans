import React, { PropTypes } from 'react'

const RecpieProfileHeader = React.createClass({

  propTypes: {
    recipe_name: PropTypes.string,
    recipe_banner_url: PropTypes.string
  },

  render() {
    return (
      <div className="container-fluid">
        <div class="row">
          <div className="fb-profile">
              <img align="left" className="fb-image-lg" src= { this.props.recipe_banner_url } alt="No image to display"/>
              <div className="fb-profile-text">
                  <h1> { this.props.recipe_name } </h1>
              </div>
          </div>
        </div>
      </div>
    )
  }

})

export default RecpieProfileHeader