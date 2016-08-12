var submitFormAction = function() {
	//Get Data fields one by one 
	console.log("submitFormCalled");
	var submitForm = document.getElementById("submissionForm");
	var submissionData = new FormData(submitForm);
	$.ajax({
		url: '/submit/submit_recipe',
		data: submissionData,
		cache: false,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function(res) {
			console.log(res)
		}
	}
};




