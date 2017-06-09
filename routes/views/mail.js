var nodemailer = require('nodemailer');

var config = require('../../mailConfig.js').config;

var transporter = nodemailer.createTransport(config);

exports = module.exports = function (req, res) {

	if (process.env.TRAVIS) {
		// If it's travis running tests, we shouldn't send emails out.
		console.log('Travis environment variable set, not sending email');
		res.statusCode = 200;
		res.end();
		return true;
	}


	var message = 'You have recieved a new message from your website contact form.<br><br>'
	+ 'Here are the details:<br><br>'
	+ 'Name: ' + req.body.name + '<br>'
    + 'Email: ' + req.body.email + '<br>'
	+ 'Message: <br><br>' + req.body.message.replace('\n', '<br>');

	var mailOptions = {
		from: '"jakestockwin.co.uk" <noreply@jakestockwin.co.uk>', // sender address
		to: 'robin.thompson@lmh.ox.ac.uk', // list of receivers
		subject: 'Website Contact Form', // Subject line
		html: message, // plaintext body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err);
			res.statusCode = 500;
		} else {
			res.statusCode = 200;
			console.log('Message sent: ' + info.response);
		}
		res.end();

	});

};
