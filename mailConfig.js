module.exports = {
	config: {
		host: 'smtp.zoho.com',
		port: 465,
		secure: true,
		authMethod: 'LOGIN',
		auth: {
			user: 'noreply@jakestockwin.co.uk',
			pass: process.env.ZOHO_PASSWORD,
		},
	},
};
