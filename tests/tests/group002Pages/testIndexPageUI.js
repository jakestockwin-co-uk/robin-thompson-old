module.exports = {
	'before': function (browser) {
		browser.index = browser.page.index();
		browser.index.navigate();
		browser.index.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Index page should initially display correctly': function (browser) {
		browser.index.assertUI();

	},
};
