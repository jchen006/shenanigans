import ModalWrapper from '../../core/Modal/ModalWrapper.jsx'
import PendingRecipeTable from '../../core/Table/PendingRecipeTable.jsx'

const PendingRecipeList = React.createClass({

  getInitialState() {
    return ({
      isOpen: false,
      loading: true,
      recipes: [],
      recipeEdit: {},
      pagination: {
        currentPage: 1,
        recipesPerPage: 20
      }
    })
  },

  handlePageClick(event) {
    const recipesPerPage = this.state.pagination.recipesPerPage
    const currentPage = Number(event.target.id)
    this.setState({
      pagination: {
        currentPage,
        recipesPerPage
      }
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
        pagination = { this.state.pagination }
        recipes = { this.state.recipes }
        onEdit = { this.onEdit }
        onApprove = { this.onApprove }
        onDelete = { this.onDelete }
      />
    )
  },

  renderPageNumbers() {
    const pageNumbers = []
    const recipesLength = this.state.recipes.length
    const recipesPerPage = this.state.pagination.recipesPerPage
    for(let i = 1; i <= Math.ceil(recipesLength/recipesPerPage); i++) {
      pageNumbers.push(i)
    }
    return (
      <nav aria-label="recipe-table-navigation">
        <ul className="pagination">
        { pageNumbers.map(number => {
          return (
            <li key = { number } className = {"page-item"}>
            <a 
              className="page-link"
              id = { number }
              onClick = { this.handlePageClick } >
            { number }
            </a>
            </li>
          )
        })}
        </ul>
      </nav>
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

  onUpdate(recipe) {
    console.log(recipe.name)
  },



  render() {
    return (
      <div className="pending-recipe-list">
        { this.renderPageNumbers() }
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
