import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Table } from 'react-bootstrap'

const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  { path: '/bubblegum',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  { path: '/shoelaces',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
]

const getAllIngredients = () => {
  fetch('/db/ingredients')
    .then(response => response.json())
    .then(data => {return data.Ingredients})
}

const IngredientsListApp = () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <div style={{
        padding: '10px',
        width: '40%',
        background: '#f0f0f0'
      }}>
        <Table hover>
          <thead>
            <td> Ingredient </td>
            <td> Flag </td>
            <td> Details </td>
          </thead>
          <tbody>
            { getAllIngredients().map(recipe => {
              return (
                <tr>
                  <td>{recipe.name}</td>
                  <td>{"None"}</td>
                  <td><Link to= {(id) => `/${id}`}>Details</Link></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Route path="/:id" component={Child}/>
      </div>
    </div>
  </Router>
)

const Child = ({match}) => (
  <div>
    <h3> ID: {match.params.id} </h3>
  </div>
)

ReactDOM.render(
  <IngredientsListApp/>,
  document.getElementById('ingredient-list-panel')
)