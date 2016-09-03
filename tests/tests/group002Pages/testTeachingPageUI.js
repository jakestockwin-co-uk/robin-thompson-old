module.exports = {
	'before': function (browser) {
		browser.teaching = browser.page.teaching();
		browser.teaching.navigate();
		browser.teaching.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Teaching page should initially display correctly': function (browser) {
		browser.teaching.assertUI();

	},
};
