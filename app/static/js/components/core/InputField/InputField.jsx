import { FieldGroup } from "react-bootstrap";
import React, { PropTypes } from "react";

const InputField = React.createClass({
  propTypes: {
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string
  },

  render() {
    return (
      <FieldGroup
        id={this.propTypes.id}
        type={this.props.type}
        label={this.props.label}
        value={this.props.value}
      />
    );
  }
});

export default InputField;
