//React Components I think the compliation error is caused by no babel processing cannot handle the jsx

var IceBox = React.createClass({
    //I need to implement the API route in database.py link to to find all to get the render data
    //I also need to add props data
    /*
    loadDataFromSever: function() {
	    $.ajax({
		    url: this.props.url,
		    dataType: 'json',
		    cache: false,
		    success: function(data) {
			    this.setState({data: data});
		    }.bind(this),
		    error: function(xhr, status, err) {
			    console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
    },
    */
    getInitialState: function() {
        return {data: []}
    },
    componentDidMount: function() {
        this.loadDataFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval)
    },
	render: function() {
		return (
			<div className="iceBox">
				"IceBox is here"
			</div>
		)
	}
});


var IceBoxList = React.createClass({
	render: function() {
		return (
		)
	}
})


var IceBoxItem = React.createClass({
		render: function() {
			return (
			)
    }
})


//React Driver Attach and render
ReactDOM.render(
    <IceBox />,
    document.getElementById('content')
):

/*
//This previously worked, so it is a babel issue
var IceBox = React.createClass({displayName: 'IceBox',
  render: function() {
    return (
      React.createElement('div', {className: "iceBox"},
        "Hello, world! I am a IceBox."
      )
    );
  }
});

ReactDOM.render(
  React.createElement(IceBox, null),
  document.getElementById('content')
);
*/
