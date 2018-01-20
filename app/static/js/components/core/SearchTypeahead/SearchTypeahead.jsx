import { Typeahead } from 'react-bootstrap-typeahead'
import React, { PropTypes } from 'react'

const SearchTypeahead = React.createClass({

  propTypes: {
    labelKey: PropTypes.string,
    align: PropTypes.oneOf(['justify', 'left', 'right']),
    options: PropTypes.object,
    placeholder: PropTypes.string
  },

  render() {
    return (
      <div>
        <Typeahead
          align={ this.props.align }
          labelKey= { this.props.labelKey }
          options={ this.props.options }
          placeholder= { this.props.recipes }
        />
      </div>
    )
 
  }

})
