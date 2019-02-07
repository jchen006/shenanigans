import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { GlyphiconButtons } from "../../components/core/GlyphiconButtons.jsx";

const RecipeList = React.createClass({
  propTypes: {
    data: propTypes.array
  },

  renderActionIcons() {
    return (
      <div className="recipe-list-action-edit">
        <GlyphiconButtons type={"glyphicon glyphicon-edit"} action={"Edit"} />
      </div>
    );
  },

  render() {
    return (
      <BootstrapTable data={this.props.data} striped={true} hover={true}>
        <TableHeaderColumn
          dataField="id"
          isKey={true}
          dataAlign="center"
          dataSort={true}
        >
          Mongo id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataAlign="center" dataSort={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="action">
          {this.renderActionIcons()}
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
});

export default RecipeList;
