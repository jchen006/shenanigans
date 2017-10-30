import ModalWrapper from '../../core/Modal/ModalWrapper.jsx'
import PendingRecipeTable from '../../core/Table/PendingRecipeTable.jsx'

const PendingRecipeList = React.createClass({

  getInitialState() {
    return ({
      isOpen: false,
      loading: true,
      recipes: [],
      recipeEdit: {}
    })
  },

  //Need to change the db to pending recipes 
  componentDidMount() {
    fetch('/db/recipes')
    .then(response => response.json())
    .then(data => {
      this.setState({
        recipes: data.Recipes,
        loading: false
      })
    })
  },


  //on Revert will be the function to reset at the top of what it originally was 
  renderModal() {
    return (
      <ModalWrapper 
        headerTitle = {"Editing Recipe"}
        onClose = { this.onClose }
        onUpdate = { this.onUpdate }
        onRevert = { this.onRevert }
        recipe = { this.state.recipeEdit }
        isOpen = { this.state.isOpen }
      />
    )
  },

  renderTable() {
    return (
      <PendingRecipeTable
        recipes = { this.state.recipes }
        onEdit = { this.onEdit }
        onApprove = { this.onApprove }
        onDelete = { this.onDelete }
      />
    )
  },

  onApprove(recipe) {
    console.log("Approved", recipe.name)
  },

  onDelete(recipe) {
    console.log("Deleted", recipe.name)
  },

  onEdit(recipe) {
    this.setState({
      isOpen: true,
      recipeEdit: recipe
    })
  },

  onClose() {
    this.setState({
      isOpen: false,
      recipeEdit: {}
    })
  },

  onUpdate() {
    console.log("update")
  },

  render() {
    return (
      <div className="pending-recipe-list">
        { this.renderTable() }
        { this.renderModal() }
      </div>
    )
  }
})


ReactDOM.render(
  <PendingRecipeList/>,
  document.getElementById('pending-recipe-list-panel')
);
