REMOVE_URL = "/mongo/remove"
APPROVE_URL = "/mongo/approve"

function remove() {
	var request_data = {

	};
	$.ajax({
		url: REMOVE_URL,
		type: "POST",
		success: function(resultData) {
			//Fire off alert that removal was success and remove row
		}, 
		error: function(errorThrown) {
			//Fire off alert that it wans't successful
		}
	})
}

function approve() {
	var request_data = {

	};
	$.ajax({
		url: APPROVE_URL, 
		type: "POST",
		success: function(resultData) {
			//remove the row 
			//alert successful
		}, 
		error: function(errorThrown) {
			//alert failure
		}
	})
}

function remove_row(num) {
	document.getElementById("icebox").deleteRow(num);
}