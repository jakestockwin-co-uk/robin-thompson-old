module.exports = {
	'before': function (browser) {
		browser.site = browser.page.site();
		browser.site.navigate();
		browser.site.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Navbar should initially display correctly': function (browser) {
		browser.site.assertUI();

	},
};
