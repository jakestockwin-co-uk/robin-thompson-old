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
		browser.adminUISignin.signin('user@keystonejs.com', 'admin');
		browser.adminUIApp.waitForHomeScreen();
	},
	'after': function (browser) {
		browser.end();
	},


	'Publications page should display correctly in the initial modal': function (browser) {
		browser.adminUIApp.openList({ section: 'Content', list: 'Publications' });
		browser.adminUIListScreen.createFirstItem();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.assertFieldUIVisible({
			modelTestConfig: PublicationModelTestConfig,
			fields: [{ name: 'title' }, { name: 'authors' }, { name: 'year' }, { name: 'ref' }, { name: 'link' }, { name: 'linkName' }],
		});
	},

	'Admin UI should allow user to add a publication': function (browser) {

		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: PublicationModelTestConfig,
			fields: {
				title: { value: 'Test publication' },
				authors: { value: 'Test Author' },
				year: { value: 2016 },
				ref: { value: 'Test ref' },
				link: { value: 'http://www.example.com/' },
				linkName: { value: 'Test link name' },
			},
		});

		// Check test inputs in inital form
		browser.adminUIInitialForm.assertFieldInputs({
			modelTestConfig: PublicationModelTestConfig,
			fields: {
				title: { value: 'Test publication' },
				authors: { value: 'Test Author' },
				year: { value: 2016 },
				ref: { value: 'Test ref' },
				link: { value: 'http://www.example.com/' },
				linkName: { value: 'Test link name' },
			},
		});

		// Save inputs
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		// Check test inputs in edit form
		browser.adminUIItemScreen.assertFieldInputs({
			modelTestConfig: PublicationModelTestConfig,
			fields: {
				title: { value: 'Test publication' },
				authors: { value: 'Test Author' },
				year: { value: '2016-01-01' }, // TODO Why does it display like this when format='YYYY' is set?
				ref: { value: 'Test ref' },
				link: { value: 'http://www.example.com/' },
				linkName: { value: 'Test link name' },
			},
		});
	},

	'The added publication should display correctly on the publications page': function (browser) {
		browser.publicationsPage.navigate();
		browser.publicationsPage.waitForPageLoad();
		browser.publicationsPage.assertUI();
		browser.publicationsPage.assertFirstPublication('Test Author Test publication (2016) Test ref (Test link name)');
		browser.publicationsPage.assertFirstPublicationLink('http://www.example.com/');
	},

	'User should be able to log into the admin UI and update the publication, e.g. by removing the link': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Publications' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.navigateToFirstItem();
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.fillFieldInputs({
			modelTestConfig: PublicationModelTestConfig,
			fields: {
				link: { value: '' },
			},
		});

		browser.adminUIItemScreen.save();
		browser.adminUIItemScreen.assertFlashMessage('Your changes have been saved successfully');

		// Check updated inputs in edit form
		browser.adminUIItemScreen.assertFieldInputs({
			modelTestConfig: PublicationModelTestConfig,
			fields: {
				title: { value: 'Test publication' },
				authors: { value: 'Test Author' },
				year: { value: '2016-01-01' }, // TODO Why does it display like this when format='YYYY' is set?
				ref: { value: 'Test ref' },
				link: { value: '' },
				linkName: { value: 'Test link name' },
			},
		});
	},

	'The updated link should no longer show on the publications page': function (browser) {

		// Now check updated inputs on the page
		browser.publicationsPage.navigate();
		browser.publicationsPage.waitForPageLoad();
		browser.publicationsPage.assertFirstPublication('Test Author Test publication (2016) Test ref');
		browser.publicationsPage.assertFirstPublicationLinkNotPresent();
	},

	'User should be able to delete a publication': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Publications' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.deleteItem('@firstItemDeleteIcon');
		browser.adminUIApp.waitForDeleteConfirmationScreen();
		browser.adminUIDeleteConfirmation.delete();
	},

	'Deleted publication should not display on the publications page': function (browser) {
		browser.publicationsPage.navigate();
		browser.publicationsPage.waitForPageLoad();
		browser.publicationsPage.assertFirstPublicationNotPresent();
	},

	'User should be able to add multiple publications': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Publications' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.createFirstItem();
		browser.adminUIApp.waitForInitialFormScreen();
		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: PublicationModelTestConfig,
			fields: {
				title: { value: 'This should display 2nd' },
				authors: { value: 'Author' },
				year: { value: 2015 },
				ref: { value: 'Test' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.new();

		browser.adminUIApp.waitForInitialFormScreen();
		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: PublicationModelTestConfig,
			fields: {
				title: { value: 'This should display 4th' },
				authors: { value: 'Author' },
				year: { value: 2013 },
				ref: { value: 'Test' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.new();

		browser.adminUIApp.waitForInitialFormScreen();
		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: PublicationModelTestConfig,
			fields: {
				title: { value: 'This should display 1st' },
				authors: { value: 'Author' },
				year: { value: 2016 },
				ref: { value: 'Test' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.new();

		browser.adminUIApp.waitForInitialFormScreen();
		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: PublicationModelTestConfig,
			fields: {
				title: { value: 'This should display 3rd' },
				authors: { value: 'Author' },
				year: { value: 2014 },
				ref: { value: 'Test' },
			},
		});
		browser.adminUIInitialForm.save();
	},

	'Publications page should display multiple publications, in the correct order': function (browser) {
		browser.publicationsPage.navigate();
		browser.publicationsPage.waitForPageLoad();
		browser.publicationsPage.assertFirstPublication('Author This should display 1st (2016) Test');
		browser.publicationsPage.assertSecondPublication('Author This should display 2nd (2015) Test');
		browser.publicationsPage.assertThirdPublication('Author This should display 3rd (2014) Test');
		browser.publicationsPage.assertFourthPublication('Author This should display 4th (2013) Test');
	},
};
