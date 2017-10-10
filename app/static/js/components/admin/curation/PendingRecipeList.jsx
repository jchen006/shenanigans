import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { GlyphiconButtons } from '../../components/core/GlyphiconButtons.jsx'
import { Modal } from 'react-responsive-modal'

const PendingRecipeList = React.createClass({

  propTypes: {
    data: propTypes.array
  },


  getInitialState() {
    return ({
      open: false
    })
  },


  renderActionIcons() {
    return (
      <div className="recipe-list-action-edit">
        <GlyphiconButtons
          type= { "glyphicon glyphicon-edit"}
          action={"Edit"}
        />
        <GlyphiconButtons
          type= { "glyphicon glyphicon-ok"}
          action={"Ok"}
        />
        <GlyphiconButtons
          type= { "glyphicon glyphicon-remove"}
          action={"Remove"}
        />
      </div>
    )
  },

  onRowClick() {
    this.setState({
      open: true
    })
  },

  onEditClose() {
    this.setState({
      open: false
    })
  },

  render() {
    const options = {
      onRowClick: this.onRowClick
    }

    return (
      <BootstrapTable data={this.props.data} striped={true} hover={true} options = { options} >
        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>
          Mongo id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataAlign="center" dataSort={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="action">
          { this.renderActionIcons() }
        </TableHeaderColumn>
      </BootstrapTable>
      <Modal open={this.state.open} onClose={this.onEditClose} little>
          <h2> Test </h2>
      </Modal>
    )
  }

})

export default PendingRecipeList