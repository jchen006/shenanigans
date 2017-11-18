import React, {PropTypes} from 'react'

const List = React.createClass({
  propTypes: {
    items: PropTypes.array
  },

  render() {
    return (
      <ul>
        { this.props.items.map(item=> (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    )
  }

})

export default List