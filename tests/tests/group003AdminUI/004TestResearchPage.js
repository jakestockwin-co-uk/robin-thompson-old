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
		browser.adminUISignin.signin('user@keystonejs.com', 'admin');
		browser.adminUIApp.waitForHomeScreen();
	},
	'after': function (browser) {
		browser.end();
	},


	'Research page should display correctly in the initial modal': function (browser) {
		browser.adminUIApp.openList({ section: 'Content', list: 'ResearchProjects' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.createFirstItem();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.assertFieldUIVisible({
			modelTestConfig: ResearchModelTestConfig,
			fields: [{ name: 'title' }, { name: 'bodyText' }],
		});
	},

	'Admin UI should allow user to add a research project': function (browser) {

		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: ResearchModelTestConfig,
			fields: {
				title: { value: 'Test research' },
				bodyText: { md: 'Some example markdown, with _italics_' },
			},
		});

		// Check test inputs in inital form
		browser.adminUIInitialForm.assertFieldInputs({
			modelTestConfig: ResearchModelTestConfig,
			fields: {
				title: { value: 'Test research' },
				bodyText: { md: 'Some example markdown, with _italics_' },
			},
		});

		// Save inputs
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		// Check test inputs in edit form
		browser.adminUIItemScreen.assertFieldInputs({
			modelTestConfig: ResearchModelTestConfig,
			fields: {
				title: { value: 'Test research' },
				bodyText: { md: 'Some example markdown, with _italics_' },
			},
		});
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
		browser.adminUIListScreen.navigateToFirstItem();
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.fillFieldInputs({
			modelTestConfig: ResearchModelTestConfig,
			fields: {
				title: { value: 'Updated Test research' },
				bodyText: { md: 'Some updated markdown, with _italics_' },
			},
		});
		browser.adminUIItemScreen.save();
		browser.adminUIItemScreen.assertFlashMessage('Your changes have been saved successfully');
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
		browser.adminUIListScreen.deleteItem('@firstItemDeleteIcon');
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

		browser.adminUIListScreen.createFirstItem();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: ResearchModelTestConfig,
			fields: {
				title: { value: 'Test research 1' },
				bodyText: { md: 'Research Project 1' },
			},
		});
		browser.adminUIInitialForm.save();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: ResearchModelTestConfig,
			fields: {
				title: { value: 'Test research 2' },
				bodyText: { md: 'Research Project 2' },
			},
		});
		browser.adminUIInitialForm.save();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: ResearchModelTestConfig,
			fields: {
				title: { value: 'Test research 3' },
				bodyText: { md: 'Research Project 3' },
			},
		});
		browser.adminUIInitialForm.save();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: ResearchModelTestConfig,
			fields: {
				title: { value: 'Test research 4' },
				bodyText: { md: 'Research Project 4' },
			},
		});
		browser.adminUIInitialForm.save();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: ResearchModelTestConfig,
			fields: {
				title: { value: 'Test research 5' },
				bodyText: { md: 'Research Project 5' },
			},
		});
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
