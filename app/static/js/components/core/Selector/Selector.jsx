import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class Selector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedOption: ''
    }
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption })
    console.log(`Selected: ${selectedOption.label}`)
    this.props.onChange()
  }

  render() {
    const { selectedOption } = this.state
    const value = selectOption && selectOption.value

    return (
      <Select
        name= { this.props.name }
        value={ value }
        onChange={ this.handleChange }
        options={ this.props.options }
      />
    )
  }
}

Selector.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default Selector