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
	'Clicking on navbar should change to the correct pages': function (browser) {
		browser.site.clickNavbar('home');
		browser.index.verifyPageLoad();
		browser.index.assertUI();
		browser.site.clickNavbar('research');
		browser.research.verifyPageLoad();
		browser.research.assertUI();
		browser.site.clickNavbar('teaching');
		browser.teaching.verifyPageLoad();
		browser.teaching.assertUI();
		browser.site.clickNavbar('publications');
		browser.publications.verifyPageLoad();
		browser.publications.assertUI();
	},
	'User should also be able to navigate using the browser\'s back and forward buttons': function (browser) {
		browser.back();
		browser.teaching.verifyPageLoad();
		browser.teaching.assertUI();
		browser.back();
		browser.research.verifyPageLoad();
		browser.research.assertUI();
		browser.back();
		browser.index.verifyPageLoad();
		browser.index.assertUI();
		browser.forward();
		browser.research.verifyPageLoad();
		browser.research.assertUI();
		browser.forward();
		browser.teaching.verifyPageLoad();
		browser.teaching.assertUI();
		browser.forward();
		browser.publications.verifyPageLoad();
		browser.publications.assertUI();
	},
};
