import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

class Graph extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: [], hasError: false }
    }
    
    componentWillMount() {
      fetch('/api/ingredient_frequency')
      .then(response => response.json())
      .then(data => {
        this.setState({
            data: data
        })
      })
    }
}