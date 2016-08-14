var submitFormAction = function() {
	//Get Data fields one by one 
	console.log("submitFormCalled");
	var submitForm = document.getElementById("submissionForm");
	var submissionData = new FormData(submitForm);
	//Need to serialize to JSON 
	console.log(submissionData.keys());
	$.ajax({
		url: '/submit/submit_ingredient',
		data: submissionData,
		contentType: 'application/json',
		type: 'POST',
		success: function(res) {
			console.log(res)
		},
		error: function(xhr, ajaxOptions, thrownError) {
			console.log("There was an error with your string." + thrownError);
		}
	});
};




