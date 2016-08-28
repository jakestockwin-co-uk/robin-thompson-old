module.exports = {
	'before': function (browser) {
		browser.research = browser.page.research();
		browser.research.navigate();
		browser.research.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Research page should initially display correctly': function (browser) {
		browser.research.assertUI();

	},
};
