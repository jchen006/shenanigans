import GlyphiconButtons from '../../core/GlyphiconButtons.jsx'
import { Modal, ModalClose, ModalHeader, ModalTitle, ModalBody } from 'react-modal-bootstrap'
import { Table } from 'react-bootstrap'
import RecipeEdit from '/RecipeEdit.jsx'

const PendingRecipeList = React.createClass({

  getInitialState() {
    return ({
      open: false,
      recipes: [],
      recipeEdit: {}
    })
  },

  componentWillMount() {
    fetch('/db/recipes')
    .then(response => response.json())
    .then(data => {
      this.setState({
        recipes: data.Recipes
      })
    })
  },


  renderActionIcons(data) {
    return (
      <div className="recipe-list-action-edit">
        <GlyphiconButtons
          glyphiconType= { "glyphicon glyphicon-edit"}
          action={"Edit"}
          onClick = { this.onEditClick }
          data = { data }
        />
        <GlyphiconButtons
          glyphiconType= { "glyphicon glyphicon-ok"}
          action={"Ok"}
        />
        <GlyphiconButtons
          glyphiconType= { "glyphicon glyphicon-remove"}
          action={"Remove"}
        />
      </div>
    )
  },

  renderModal() {
    return (
      <Modal isOpen={this.state.open} onRequestHide = {this.onEditClose}>
        <ModalHeader>
          <ModalClose onClick={this.onEditClose}/>
          <ModalTitle>  Editing Mode </ModalTitle>
          <ModalBody>
            <RecipeEdit recipe = { this.state.recipeEdit} />
          </ModalBody>
        </ModalHeader>
      </Modal>
    )
  },

  renderTableHeader() {
    return (
      <thead>
        <tr>
          <th> Mongo Id </th>
          <th> Name </th>
          <th> Actions </th>
        </tr>
      </thead>
    )
  },

  renderRow(recipe) {
    return (
      <tbody>
        <tr>
          <td> {recipe._id.$oid} </td>
          <td> {recipe.name} </td>
          <td> { this.renderActionIcons(recipe) } </td>
        </tr>
      </tbody>
    )
  },

  renderRows() {
    return(this.state.recipes.map(recipe => {
      return (
        this.renderRow(recipe)
      )
    }))
  },

  onEditClick(recipe) {
    this.setState({
      open: true,
      recipeEdit: recipe
    })
  },

  onEditClose() {
    this.setState({
      open: false,
      recipeEdit: {}
    })
  },

  render() {
    return (
      <div className="pending-recipe-list">
        <Table responsive>
          { this.renderTableHeader() }
          { this.renderRows() }
        </Table>
        { this.renderModal() }
      </div>
    )
  }
})


if(document.getElementById("pending_recipe_list_panel")) {
  ReactDOM.render(
    <PendingRecipeList/>, document.getElementById('pending_recipe_list_panel')
  )
}