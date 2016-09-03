module.exports = {
	'before': function (browser) {
		browser.site = browser.page.site();
		browser.index = browser.page.index();
		browser.publications = browser.page.publications();
		browser.research = browser.page.research();
		browser.teaching = browser.page.teaching();
		browser.site.navigate();
		browser.site.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Navbar should initially display correctly': function (browser) {
		browser.site.clickNavbar('home');
		browser.index.verifyPageLoad();
		browser.site.clickNavbar('research');
		browser.research.verifyPageLoad();
		browser.site.clickNavbar('teaching');
		browser.teaching.verifyPageLoad();
		browser.site.clickNavbar('publications');
		browser.publications.verifyPageLoad();
	},
};
