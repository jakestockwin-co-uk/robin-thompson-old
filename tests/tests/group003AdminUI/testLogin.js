module.exports = {
	'before': function (browser) {
		browser.app = browser.page.adminUIApp();
		browser.url('http://localhost:3000/keystone');
		browser.adminUISignin = browser.page.adminUISignin();
		browser.adminUIApp = browser.page.adminUIApp();
	},
	'after': function (browser) {
		browser.end();
	},
	'Signin page should initially display correctly': function (browser) {
		browser.adminUISignin.assertUI();
	},
	'Signin page should allow users to log in': function (browser) {
		browser.adminUISignin.signin('user@keystonejs.com', 'admin');
		browser.adminUIApp.waitForHomeScreen();
	},
};
