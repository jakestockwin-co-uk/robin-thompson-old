var ResearchModelTestConfig = require('../../modelTestConfig/researchModelTestConfig');

module.exports = {
	'before': function (browser) {
		browser.adminUIApp = browser.page.adminUIApp();
		browser.adminUISignin = browser.page.adminUISignin();
		browser.adminUIListScreen = browser.page.adminUIListScreen();
		browser.adminUIInitialForm = browser.page.adminUIInitialForm();
		browser.adminUIItemScreen = browser.page.adminUIItemScreen();
		browser.adminUIDeleteConfirmation = browser.page.adminUIDeleteConfirmation();
		browser.researchPage = browser.page.research();
		browser.projectPage = browser.page.researchProject();
		browser.adminUIApp.navigate();
		browser.adminUISignin.signin({ user: 'user@keystonejs.com', password: 'admin', wait: false });
		browser.adminUIApp.waitForHomeScreen(60000); // Long timeout for first time adminUI loads.
		browser.adminUIInitialForm.setDefaultModelTestConfig(ResearchModelTestConfig);
		browser.adminUIItemScreen.setDefaultModelTestConfig(ResearchModelTestConfig);
		browser.adminUIListScreen.setDefaultModelTestConfig(ResearchModelTestConfig);
	},
	'after': function (browser) {
		browser.end();
	},


	'Research page should display correctly in the initial modal': function (browser) {
		browser.adminUIApp.openList({ section: 'Content', list: 'ResearchProjects' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickCreateItemButton();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.assertFieldUIVisible({ fields: [{ name: 'title' }, { name: 'bodyText' }] });
	},

	'Admin UI should allow user to add a research project': function (browser) {

		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test research' } },
			{ name: 'bodyText', input: { md: 'Some example markdown, with _italics_' } },
		] });

		// Check test inputs in inital form
		browser.adminUIInitialForm.assertFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test research' } },
			{ name: 'bodyText', input: { md: 'Some example markdown, with _italics_' } },
		] });

		// Save inputs
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		// Check test inputs in edit form
		browser.adminUIItemScreen.assertFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test research' } },
			{ name: 'bodyText', input: { md: 'Some example markdown, with _italics_' } },
		] });
	},

	'The added research project should display correctly on the research page': function (browser) {
		browser.researchPage.navigate();
		browser.researchPage.waitForPageLoad();
		browser.researchPage.assertUI();
		browser.researchPage.assertNResearchProjectsVisible(1, true);
		browser.researchPage.assertNthResearchProjectText(1, 'Test research');

	},

	'User should be able ot click on added research, and should be taken to project page': function (browser) {
		browser.researchPage.clickNthResearchProject(1);
		browser.projectPage.waitForPageLoad();
		browser.projectPage.assertUI();
		browser.projectPage.assertTitle('Test research');
		browser.projectPage.assertText('Some example markdown, with italics');
	},

	'There should be a link on the project page to go back to the research page': function (browser) {
		browser.projectPage.backToResearchPage();
		browser.projectPage.verifyPageLoad();
	},

	'User should be able to log back in and edit the added research': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'ResearchProjects' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickItemFieldValue({ fields: [{ name: 'title', row: '1', column: '2' }] });
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Updated Test research' } },
			{ name: 'bodyText', input: { md: 'Some updated markdown, with _italics_' } },
		] });
		browser.adminUIItemScreen.save();
		browser.adminUIItemScreen.assertElementTextEquals({
			element: '@flashMessage',
			text: 'Your changes have been saved successfully'
		});
	},

	'The updated research should display correctly on the research projects page': function (browser) {
		browser.researchPage.navigate();
		browser.researchPage.waitForPageLoad();
		browser.researchPage.assertUI();
		browser.researchPage.assertNResearchProjectsVisible(1, true);
		browser.researchPage.assertNthResearchProjectText(1, 'Updated Test research');
	},

	'The updated projects should have changed on the project page': function (browser) {
		browser.researchPage.clickNthResearchProject(1);
		browser.projectPage.waitForPageLoad();
		browser.projectPage.assertUI();
		browser.projectPage.assertTitle('Updated Test research');
		browser.projectPage.assertText('Some updated markdown, with italics');
	},

	'User should be able to log back in and delete the added research': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'ResearchProjects' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickDeleteItemIcon({ icons: [{ row: 1, column: 1 }] });
		browser.adminUIApp.waitForDeleteConfirmationScreen();
		browser.adminUIDeleteConfirmation.delete();
		browser.adminUIApp.waitForListScreen();
	},

	'The deleted research should no longer show on the research page': function (browser) {
		browser.researchPage.navigate();
		browser.researchPage.waitForPageLoad();
		browser.researchPage.assertUI();
		browser.researchPage.assertNResearchProjectsVisible(0, true);
	},

	'User should be able to add multiple research projects': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'ResearchProjects' });
		browser.adminUIApp.waitForListScreen();

		browser.adminUIListScreen.clickCreateItemButton();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test research 1' } },
			{ name: 'bodyText', input: { md: 'Research Project 1' } },
		] });
		browser.adminUIInitialForm.save();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test research 2' } },
			{ name: 'bodyText', input: { md: 'Research Project 2' } },
		] });
		browser.adminUIInitialForm.save();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test research 3' } },
			{ name: 'bodyText', input: { md: 'Research Project 3' } },
		] });
		browser.adminUIInitialForm.save();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test research 4' } },
			{ name: 'bodyText', input: { md: 'Research Project 4' } },
		] });
		browser.adminUIInitialForm.save();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test research 5' } },
			{ name: 'bodyText', input: { md: 'Research Project 5' } },
		] });
		browser.adminUIInitialForm.save();
	},

	'New projects should all display on research page': function (browser) {
		browser.researchPage.navigate();
		browser.researchPage.waitForPageLoad();
		browser.researchPage.assertUI();
		browser.researchPage.assertNResearchProjectsVisible(5, true);
		browser.researchPage.assertNthResearchProjectText(1, 'Test research 1');
		browser.researchPage.assertNthResearchProjectText(2, 'Test research 2');
		browser.researchPage.assertNthResearchProjectText(3, 'Test research 3');
		browser.researchPage.assertNthResearchProjectText(4, 'Test research 4');
		browser.researchPage.assertNthResearchProjectText(5, 'Test research 5');
	},

	'New projects should each have their own project page': function (browser) {
		browser.researchPage.clickNthResearchProject(1);
		browser.projectPage.verifyPageLoad();
		browser.projectPage.assertTitle('Test research 1');
		browser.projectPage.assertText('Research Project 1');
		browser.projectPage.backToResearchPage();
		browser.researchPage.verifyPageLoad();

		browser.researchPage.clickNthResearchProject(2);
		browser.projectPage.verifyPageLoad();
		browser.projectPage.assertTitle('Test research 2');
		browser.projectPage.assertText('Research Project 2');
		browser.projectPage.backToResearchPage();
		browser.researchPage.verifyPageLoad();

		browser.researchPage.clickNthResearchProject(3);
		browser.projectPage.verifyPageLoad();
		browser.projectPage.assertTitle('Test research 3');
		browser.projectPage.assertText('Research Project 3');
		browser.projectPage.backToResearchPage();
		browser.researchPage.verifyPageLoad();

		browser.researchPage.clickNthResearchProject(4);
		browser.projectPage.verifyPageLoad();
		browser.projectPage.assertTitle('Test research 4');
		browser.projectPage.assertText('Research Project 4');
		browser.projectPage.backToResearchPage();
		browser.researchPage.verifyPageLoad();

		browser.researchPage.clickNthResearchProject(5);
		browser.projectPage.verifyPageLoad();
		browser.projectPage.assertTitle('Test research 5');
		browser.projectPage.assertText('Research Project 5');
		browser.projectPage.backToResearchPage();
		browser.researchPage.verifyPageLoad();
	},

	'Should also be able to go from projects page to research page by pressing browser\'s back button': function (browser) {
		browser.researchPage.clickNthResearchProject(1);
		browser.projectPage.verifyPageLoad();
		browser.back();
		browser.researchPage.verifyPageLoad();
	},

	'Should now be able to go back to the project by pressing the browser\'s forward button': function (browser) {
		browser.forward();
		browser.projectPage.verifyPageLoad();
		browser.projectPage.assertTitle('Test research 1');
		browser.projectPage.assertText('Research Project 1');
	},

};
