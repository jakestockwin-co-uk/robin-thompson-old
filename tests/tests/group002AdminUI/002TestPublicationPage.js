var PublicationModelTestConfig = require('../../modelTestConfig/publicationModelTestConfig');

module.exports = {
	'before': function (browser) {
		browser.adminUIApp = browser.page.adminUIApp();
		browser.adminUISignin = browser.page.adminUISignin();
		browser.adminUIListScreen = browser.page.adminUIListScreen();
		browser.adminUIInitialForm = browser.page.adminUIInitialForm();
		browser.adminUIItemScreen = browser.page.adminUIItemScreen();
		browser.adminUIDeleteConfirmation = browser.page.adminUIDeleteConfirmation();
		browser.publicationsPage = browser.page.publications();
		browser.adminUIApp.navigate();
		browser.adminUISignin.signin({ user: 'user@keystonejs.com', password: 'admin', wait: false });
		browser.adminUIApp.waitForHomeScreen({ timeout: 60000 }); // Long timeout for first time adminUI loads.
		browser.adminUIInitialForm.setDefaultModelTestConfig(PublicationModelTestConfig);
		browser.adminUIItemScreen.setDefaultModelTestConfig(PublicationModelTestConfig);
		browser.adminUIListScreen.setDefaultModelTestConfig(PublicationModelTestConfig);
	},
	'after': function (browser) {
		browser.end();
	},


	'Publications page should display correctly in the initial modal': function (browser) {
		browser.adminUIApp.openList({ section: 'Content', list: 'Publications' });
		browser.adminUIListScreen.clickCreateItemButton();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.assertFieldUIVisible({ fields: [
			{ name: 'title' },
			{ name: 'authors' },
			{ name: 'year' },
			{ name: 'ref' },
			{ name: 'link' },
			{ name: 'linkName' },
		] });
	},

	'Admin UI should allow user to add a publication': function (browser) {

		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test publication' } },
			{ name: 'authors', input: { value: 'Test Author' } },
			{ name: 'year', input: { value: 2016 } },
			{ name: 'ref', input: { value: 'Test ref' } },
			{ name: 'link', input: { value: 'http://www.example.com/' } },
			{ name: 'linkName', input: { value: 'Test link name' } },
		] });

		// Check test inputs in inital form
		browser.adminUIInitialForm.assertFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test publication' } },
			{ name: 'authors', input: { value: 'Test Author' } },
			{ name: 'year', input: { value: 2016 } },
			{ name: 'ref', input: { value: 'Test ref' } },
			{ name: 'link', input: { value: 'http://www.example.com/' } },
			{ name: 'linkName', input: { value: 'Test link name' } },
		] });

		// Save inputs
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		// Check test inputs in edit form
		browser.adminUIItemScreen.assertFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test publication' } },
			{ name: 'authors', input: { value: 'Test Author' } },
			// The following is disabled because of timezone issues. Ref: https://github.com/keystonejs/keystone/issues/1702
			// { name: 'year', input: { value: '2016-01-01' } }, // TODO Why does it display like this when format='YYYY' is set?
			{ name: 'ref', input: { value: 'Test ref' } },
			{ name: 'link', input: { value: 'http://www.example.com/' } },
			{ name: 'linkName', input: { value: 'Test link name' } },
		] });
	},

	'The added publication should display correctly on the publications page': function (browser) {
		browser.publicationsPage.navigate();
		browser.publicationsPage.waitForPageLoad();
		browser.publicationsPage.assertUI();
		// browser.publicationsPage.assertNthPublication(1, 'Test Author Test publication (2016) Test ref (Test link name)');
		browser.publicationsPage.assertNthPublicationContains(1, 'Test Author Test publication');
		browser.publicationsPage.assertNthPublicationLink(1, 'http://www.example.com/');
	},

	'User should be able to log into the admin UI and update the publication, e.g. by removing the link': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Publications' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickItemFieldValue({ fields: [{ name: 'title', row: '1', column: '2' }] });
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.fillFieldInputs({ fields: [
			{ name: 'link', input: { value: '' } },
		] });

		browser.adminUIItemScreen.save();
		browser.adminUIItemScreen.assertElementTextEquals({
			element: '@flashMessage',
			text: 'Your changes have been saved successfully',
		});

		// Check updated inputs in edit form
		browser.adminUIItemScreen.assertFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test publication' } },
			{ name: 'authors', input: { value: 'Test Author' } },
			// The following is disabled because of timezone issues. Ref: https://github.com/keystonejs/keystone/issues/1702
			// { name: 'year', input: { value: '2016-01-01' } }, // TODO Why does it display like this when format='YYYY' is set?
			{ name: 'ref', input: { value: 'Test ref' } },
			{ name: 'link', input: { value: '' } },
			{ name: 'linkName', input: { value: 'Test link name' } },
		] });
	},

	'The updated link should no longer show on the publications page': function (browser) {

		// Now check updated inputs on the page
		browser.publicationsPage.navigate();
		browser.publicationsPage.waitForPageLoad();
		// browser.publicationsPage.assertNthPublication(1, 'Test Author Test publication (2016) Test ref');
		browser.publicationsPage.assertNthPublicationContains(1, 'Test Author Test publication');
		browser.publicationsPage.assertNthPublicationLinkNotPresent(1);
	},

	'User should be able to delete a publication': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Publications' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickDeleteItemIcon({ icons: [{ row: 1, column: 1 }] });
		browser.adminUIApp.waitForDeleteConfirmationScreen();
		browser.adminUIDeleteConfirmation.delete();
	},

	'Deleted publication should not display on the publications page': function (browser) {
		browser.publicationsPage.navigate();
		browser.publicationsPage.waitForPageLoad();
		browser.publicationsPage.assertNthPublicationNotPresent(1);
	},

	'User should be able to add multiple publications': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Publications' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickCreateItemButton();
		browser.adminUIApp.waitForInitialFormScreen();
		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'This should display 2nd' } },
			{ name: 'authors', input: { value: 'Author' } },
			{ name: 'year', input: { value: 2015 } },
			{ name: 'ref', input: { value: 'Test' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.new();

		browser.adminUIApp.waitForInitialFormScreen();
		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'This should display 4th' } },
			{ name: 'authors', input: { value: 'Author' } },
			{ name: 'year', input: { value: 2013 } },
			{ name: 'ref', input: { value: 'Test' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.new();

		browser.adminUIApp.waitForInitialFormScreen();
		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'This should display 1st' } },
			{ name: 'authors', input: { value: 'Author' } },
			{ name: 'year', input: { value: 2016 } },
			{ name: 'ref', input: { value: 'Test' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.new();

		browser.adminUIApp.waitForInitialFormScreen();
		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'This should display 3rd' } },
			{ name: 'authors', input: { value: 'Author' } },
			{ name: 'year', input: { value: 2014 } },
			{ name: 'ref', input: { value: 'Test' } },
		] });
		browser.adminUIInitialForm.save();
	},

	'Publications page should display multiple publications, in the correct order': function (browser) {
		browser.publicationsPage.navigate();
		browser.publicationsPage.waitForPageLoad();
		// The following is disabled because of timezone issues. Ref: https://github.com/keystonejs/keystone/issues/1702
		// browser.publicationsPage.assertNthPublication(1, 'Author This should display 1st (2016) Test');
		// browser.publicationsPage.assertNthPublication(2, 'Author This should display 2nd (2015) Test');
		// browser.publicationsPage.assertNthPublication(3, 'Author This should display 3rd (2014) Test');
		// browser.publicationsPage.assertNthPublication(4, 'Author This should display 4th (2013) Test');
		browser.publicationsPage.assertNthPublicationContains(1, 'Author This should display 1st');
		browser.publicationsPage.assertNthPublicationContains(2, 'Author This should display 2nd');
		browser.publicationsPage.assertNthPublicationContains(3, 'Author This should display 3rd');
		browser.publicationsPage.assertNthPublicationContains(4, 'Author This should display 4th');
	},
};
