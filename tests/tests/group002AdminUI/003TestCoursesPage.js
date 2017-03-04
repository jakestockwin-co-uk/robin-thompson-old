var CourseModelTestConfig = require('../../modelTestConfig/courseModelTestConfig');

module.exports = {
	'before': function (browser) {
		browser.adminUIApp = browser.page.adminUIApp();
		browser.adminUISignin = browser.page.adminUISignin();
		browser.adminUIListScreen = browser.page.adminUIListScreen();
		browser.adminUIInitialForm = browser.page.adminUIInitialForm();
		browser.adminUIItemScreen = browser.page.adminUIItemScreen();
		browser.adminUIDeleteConfirmation = browser.page.adminUIDeleteConfirmation();
		browser.teachingPage = browser.page.teaching();
		browser.adminUIApp.navigate();
		browser.adminUISignin.signin({ user: 'user@keystonejs.com', password: 'admin', wait: false });
		browser.adminUIApp.waitForHomeScreen({ timeout: 60000 }); // Long timeout for first time adminUI loads.
		browser.adminUIInitialForm.setDefaultModelTestConfig(CourseModelTestConfig);
		browser.adminUIItemScreen.setDefaultModelTestConfig(CourseModelTestConfig);
		browser.adminUIListScreen.setDefaultModelTestConfig(CourseModelTestConfig);
	},
	'after': function (browser) {
		browser.end();
	},


	'Courses page should display correctly in the initial modal': function (browser) {
		browser.adminUIApp.openList({ section: 'Content', list: 'Courses' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickCreateItemButton();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.assertFieldUIVisible({ fields: [
			{ name: 'title' },
			{ name: 'link' },
			{ name: 'year', options: { editForm: 'false' } },
		] });
	},

	'Admin UI should allow user to add a course': function (browser) {

		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course' } },
			{ name: 'year', input: { value: 'Prelims' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/113' } },
		] });

		// Check test inputs in inital form
		browser.adminUIInitialForm.assertFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/113' } },
			{ name: 'year', input: { value: 'Prelims' } },
		] });

		// Save inputs
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		// Check test inputs in edit form
		browser.adminUIItemScreen.assertFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/113' } },
			{ name: 'year', input: { value: 'Prelims' } },
		] });
	},

	'The added course should display correctly on the courses page': function (browser) {
		browser.teachingPage.navigate();
		browser.teachingPage.waitForPageLoad();
		browser.teachingPage.assertUI();
		browser.teachingPage.assertNFirstYearCourses(1);
		browser.teachingPage.assertNthFirstYearCourse(1, 'Test course', 'https://courses.maths.ox.ac.uk/node/113');
		browser.teachingPage.assertNSecondYearCourses(0);
		browser.teachingPage.assertNThirdYearCourses(0);
		browser.teachingPage.assertNFourthYearCourses(0);

	},

	'User should be able to log back in and edit the added course': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Courses' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickItemFieldValue({ fields: [{ name: 'title', row: '1', column: '2' }] });
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: ' Updated Test Course' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/114' } },
			{ name: 'year', input: { value: 'Part B' } },
		] });
		browser.adminUIItemScreen.save();
		browser.adminUIItemScreen.assertElementTextEquals({
			element: '@flashMessage',
			text: 'Your changes have been saved successfully',
		});
	},

	'The updated course should display correctly on the courses page': function (browser) {
		browser.teachingPage.navigate();
		browser.teachingPage.waitForPageLoad();
		browser.teachingPage.assertUI();
		browser.teachingPage.assertNFirstYearCourses(0);
		browser.teachingPage.assertNSecondYearCourses(0);
		browser.teachingPage.assertNThirdYearCourses(1);
		browser.teachingPage.assertNthThirdYearCourse(1, 'Updated Test Course', 'https://courses.maths.ox.ac.uk/node/114');
		browser.teachingPage.assertNFourthYearCourses(0);

	},

	'User should be able to log back in and delete the added course': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Courses' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickDeleteItemIcon({ icons: [{ row: 1, column: 1 }] });
		browser.adminUIApp.waitForDeleteConfirmationScreen();
		browser.adminUIDeleteConfirmation.delete();
		browser.adminUIApp.waitForListScreen();
	},

	'The deleted course should no longer show on the teaching page': function (browser) {
		browser.teachingPage.navigate();
		browser.teachingPage.waitForPageLoad();
		browser.teachingPage.assertUI();
		browser.teachingPage.assertNFirstYearCourses(0);
		browser.teachingPage.assertNSecondYearCourses(0);
		browser.teachingPage.assertNThirdYearCourses(0);
		browser.teachingPage.assertNFourthYearCourses(0);
	},

	'User should be able to add multiple courses': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Courses' });
		browser.adminUIApp.waitForListScreen();

		browser.adminUIListScreen.clickCreateItemButton();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course 1' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/113' } },
			{ name: 'year', input: { value: 'Prelims' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course 2' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/114' } },
			{ name: 'year', input: { value: 'Prelims' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course 3' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/115' } },
			{ name: 'year', input: { value: 'Part A' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course 4' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/116' } },
			{ name: 'year', input: { value: 'Part A' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course 5' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/117' } },
			{ name: 'year', input: { value: 'Part A' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course 6' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/118' } },
			{ name: 'year', input: { value: 'Part A' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course 7' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/119' } },
			{ name: 'year', input: { value: 'Part B' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course 8' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/120' } },
			{ name: 'year', input: { value: 'Part B' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({ fields: [
			{ name: 'title', input: { value: 'Test course 9' } },
			{ name: 'link', input: { value: 'https://courses.maths.ox.ac.uk/node/121' } },
			{ name: 'year', input: { value: 'Part C' } },
		] });
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();
	},

	'All courses should display correctly on the teaching page': function (browser) {
		browser.teachingPage.navigate();
		browser.teachingPage.waitForPageLoad();
		browser.teachingPage.assertUI();
		browser.teachingPage.assertNFirstYearCourses(2);
		browser.teachingPage.assertNthFirstYearCourse(1, 'Test course 1', 'https://courses.maths.ox.ac.uk/node/113');
		browser.teachingPage.assertNthFirstYearCourse(2, 'Test course 2', 'https://courses.maths.ox.ac.uk/node/114');
		browser.teachingPage.assertNSecondYearCourses(4);
		browser.teachingPage.assertNthSecondYearCourse(1, 'Test course 3', 'https://courses.maths.ox.ac.uk/node/115');
		browser.teachingPage.assertNthSecondYearCourse(2, 'Test course 4', 'https://courses.maths.ox.ac.uk/node/116');
		browser.teachingPage.assertNthSecondYearCourse(3, 'Test course 5', 'https://courses.maths.ox.ac.uk/node/117');
		browser.teachingPage.assertNthSecondYearCourse(4, 'Test course 6', 'https://courses.maths.ox.ac.uk/node/118');
		browser.teachingPage.assertNThirdYearCourses(2);
		browser.teachingPage.assertNthThirdYearCourse(1, 'Test course 7', 'https://courses.maths.ox.ac.uk/node/119');
		browser.teachingPage.assertNthThirdYearCourse(2, 'Test course 8', 'https://courses.maths.ox.ac.uk/node/120');
		browser.teachingPage.assertNFourthYearCourses(1);
		browser.teachingPage.assertNthFourthYearCourse(1, 'Test course 9', 'https://courses.maths.ox.ac.uk/node/121');
	},

};
