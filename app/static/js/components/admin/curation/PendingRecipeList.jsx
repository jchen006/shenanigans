import ModalWrapper from '../../core/Modal/ModalWrapper.jsx'
import Loader from 'react-loaders'
import PendingRecipeTable from '../../core/Table/PendingRecipeTable.jsx'

const PendingRecipeList = React.createClass({

  getInitialState() {
    return ({
      open: false,
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
        recipe = { this.state.recipe }
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

  renderLoader() {
    return (
      <div className="pending-recipe-loader">
        <Loader type="ball-grid-pulse" />
      </div>
    )
  },

  onApprove() {
    console.log("Approved")
  },

  onDelete() {
    console.log("Deleted")
  },

  onEdit(recipe) {
    this.setState({
      open: true,
      recipeEdit: recipe
    })
  },

  onClose() {
    this.setState({
      open: false,
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
