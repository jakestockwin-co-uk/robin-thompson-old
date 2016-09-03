module.exports = {
	'before': function (browser) {
		browser.publications = browser.page.publications();
		browser.publications.navigate();
		browser.publications.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Publications page should initially display correctly': function (browser) {
		browser.publications.assertUI();

	},
};
