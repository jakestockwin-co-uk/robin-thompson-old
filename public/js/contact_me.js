$(function () {
    bindToContactForm
});
function bindToContactForm() {
	$('#contactForm input,#contactForm textarea').jqBootstrapValidation({
		preventSubmit: true,
		submitError: function ($form, event, errors) {
			// additional error messages or events
		},
		submitSuccess: function ($form, event) {
			event.preventDefault(); // prevent default submit behaviour
			// get values from FORM
			var name = $('#contactForm input#name').val();
			var email = $('#contactForm input#email').val();
			var message = $('#contactForm textarea#message').val();
			var firstName = name; // For Success/Failure Message
			// Check for white space in name for Success/Fail message
			if (firstName.indexOf(' ') >= 0) {
				firstName = name.split(' ').slice(0, -1).join(' ');
			}

			// Success message
			$('#contactForm #success').html("<div class='alert alert-info'>");
			$('#contactForm #success > .alert-info').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
				.append('</button>');
			$('#contactForm #success > .alert-info')
				.append('<strong>Please wait while we try to send your message. This may take some time. </strong>');
			$('#contactForm #success > .alert-info')
				.append('</div>');

			$.ajax({
				url: 'mail',
				type: 'POST',
				data: {
					name: name,
					email: email,
					message: message,
				},
				cache: false,
				success: function () {
					// Success message
					$('#contactForm #success').html("<div class='alert alert-success'>");
					$('#contactForm #success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
						.append('</button>');
					$('#contactForm #success > .alert-success')
						.append('<strong>Your message has been sent. </strong>');
					$('#contactForm #success > .alert-success')
						.append('</div>');

					// clear all fields
					$('#contactForm').trigger('reset');
				},
				error: function () {
					// Fail message
					$('#contactForm #success').html("<div class='alert alert-danger'>");
					$('#contactForm #success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
						.append('</button>');
					$('#contactForm #success > .alert-danger').append('<strong>Sorry ' + firstName + ', it seems that my mail server is not responding. Please try again later!');
					$('#contactForm #success > .alert-danger').append('</div>');
					// clear all fields
					$('#contactForm').trigger('reset');
				},
			});
		},
		filter: function () {
			return $(this).is(':visible');
		},
	});

	$('a[data-toggle="tab"]').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
}


/* When clicking on Full hide fail/success boxes */
$('#contactForm #name').focus(function () {
	$('#contactForm #success').html('');
});
