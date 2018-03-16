import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class Selector extends React.Component {

  constructor(props) {
    super(props)
  }

  handleSelectChange(selectedOption) {
    console.log(`Selected: ${selectedOption.label}`)
    this.props.onChange(selectedOption)
  }

  render() {
    const value = this.props.selectedOptions && this.props.selectedOptions.value

    return (
      <Select
        name= { this.props.name }
        value={ value }
        onChange={ this.onChange }
        options={ this.props.options }
        multi = { this.props.multi }
        placeholder = { this.props.placeholder }
      />
    )
  }
}

Selector.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  multi: PropTypes.bool,
  selectedOptions: PropTypes.array,
  placeholder: PropTypes.string
}

export default Selector