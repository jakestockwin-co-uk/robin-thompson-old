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
		browser.adminUISignin.signin('user@keystonejs.com', 'admin');
		browser.adminUIApp.waitForHomeScreen();
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
		browser.adminUIInitialForm.assertFieldUIVisible([
			{ name: 'title' },
			{ name: 'courseNumber' },
			{ name: 'year', options: { editForm: 'false' } },
		]);
	},

	'Admin UI should allow user to add a course': function (browser) {

		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs([
			{ name: 'title', input: { value: 'Test course' } },
			{ name: 'courseNumber', input: { value: '1111' } },
			{ name: 'year', input: { value: 'Prelims' } },
		]);

		// Check test inputs in inital form
		browser.adminUIInitialForm.assertFieldInputs([
			{ name: 'title', input: { value: 'Test course' } },
			{ name: 'courseNumber', input: { value: '1111' } },
			{ name: 'year', input: { value: 'Prelims' } },
		]);

		// Save inputs
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		// Check test inputs in edit form
		browser.adminUIItemScreen.assertFieldInputs([
			{ name: 'title', input: { value: 'Test course' } },
			{ name: 'courseNumber', input: { value: '1111' } },
			{ name: 'year', input: { value: 'Prelims' } },
		]);
	},

	'The added course should display correctly on the courses page': function (browser) {
		browser.teachingPage.navigate();
		browser.teachingPage.waitForPageLoad();
		browser.teachingPage.assertUI();
		browser.teachingPage.assertNFirstYearCourses(1);
		browser.teachingPage.assertNthFirstYearCourse(1, 'Test course', 'http://www0.maths.ox.ac.uk/courses/course/1111');
		browser.teachingPage.assertNSecondYearCourses(0);
		browser.teachingPage.assertNThirdYearCourses(0);
		browser.teachingPage.assertNFourthYearCourses(0);

	},

	'User should be able to log back in and edit the added course': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Courses' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickItemFieldValue([{ name: 'title', row: '1', column: '2' }]);
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.fillFieldInputs([
			{ name: 'title', input: { value: ' Updated Test Course' } },
			{ name: 'courseNumber', input: { value: '2222' } },
			{ name: 'year', input: { value: 'Part B' } },
		]);
		browser.adminUIItemScreen.save();
		browser.adminUIItemScreen.assertElementTextEquals('flashMessage', 'Your changes have been saved successfully');
	},

	'The updated course should display correctly on the courses page': function (browser) {
		browser.teachingPage.navigate();
		browser.teachingPage.waitForPageLoad();
		browser.teachingPage.assertUI();
		browser.teachingPage.assertNFirstYearCourses(0);
		browser.teachingPage.assertNSecondYearCourses(0);
		browser.teachingPage.assertNThirdYearCourses(1);
		browser.teachingPage.assertNthThirdYearCourse(1, 'Updated Test Course', 'http://www0.maths.ox.ac.uk/courses/course/2222');
		browser.teachingPage.assertNFourthYearCourses(0);

	},

	'User should be able to log back in and delete the added course': function (browser) {
		browser.adminUIApp.navigate();
		browser.adminUIApp.waitForHomeScreen();
		browser.adminUIApp.openList({ section: 'Content', list: 'Courses' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.clickDeleteItemIcon([{ row: 1, column: 1 }]);
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
		browser.adminUIInitialForm.fillFieldInputs([
			{ name: 'title', input: { value: 'Test course 1' } },
			{ name: 'courseNumber', input: { value: '1111' } },
			{ name: 'year', input: { value: 'Prelims' } },
		]);
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs([
			{ name: 'title', input: { value: 'Test course 2' } },
			{ name: 'courseNumber', input: { value: '2222' } },
			{ name: 'year', input: { value: 'Prelims' } },
		]);
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs([
			{ name: 'title', input: { value: 'Test course 3' } },
			{ name: 'courseNumber', input: { value: '3333' } },
			{ name: 'year', input: { value: 'Part A' } },
		]);
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs([
			{ name: 'title', input: { value: 'Test course 4' } },
			{ name: 'courseNumber', input: { value: '4444' } },
			{ name: 'year', input: { value: 'Part A' } },
		]);
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs([
			{ name: 'title', input: { value: 'Test course 5' } },
			{ name: 'courseNumber', input: { value: '5555' } },
			{ name: 'year', input: { value: 'Part A' } },
		]);
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs([
			{ name: 'title', input: { value: 'Test course 6' } },
			{ name: 'courseNumber', input: { value: '6666' } },
			{ name: 'year', input: { value: 'Part A' } },
		]);
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs([
			{ name: 'title', input: { value: 'Test course 7' } },
			{ name: 'courseNumber', input: { value: '7777' } },
			{ name: 'year', input: { value: 'Part B' } },
		]);
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs([
			{ name: 'title', input: { value: 'Test course 8' } },
			{ name: 'courseNumber', input: { value: '8888' } },
			{ name: 'year', input: { value: 'Part B' } },
		]);
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs([
			{ name: 'title', input: { value: 'Test course 9' } },
			{ name: 'courseNumber', input: { value: '9999' } },
			{ name: 'year', input: { value: 'Part C' } },
		]);
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();
	},

	'All courses should display correctly on the teaching page': function (browser) {
		browser.teachingPage.navigate();
		browser.teachingPage.waitForPageLoad();
		browser.teachingPage.assertUI();
		browser.teachingPage.assertNFirstYearCourses(2);
		browser.teachingPage.assertNthFirstYearCourse(1, 'Test course 1', 'http://www0.maths.ox.ac.uk/courses/course/1111');
		browser.teachingPage.assertNthFirstYearCourse(2, 'Test course 2', 'http://www0.maths.ox.ac.uk/courses/course/2222');
		browser.teachingPage.assertNSecondYearCourses(4);
		browser.teachingPage.assertNthSecondYearCourse(1, 'Test course 3', 'http://www0.maths.ox.ac.uk/courses/course/3333');
		browser.teachingPage.assertNthSecondYearCourse(2, 'Test course 4', 'http://www0.maths.ox.ac.uk/courses/course/4444');
		browser.teachingPage.assertNthSecondYearCourse(3, 'Test course 5', 'http://www0.maths.ox.ac.uk/courses/course/5555');
		browser.teachingPage.assertNthSecondYearCourse(4, 'Test course 6', 'http://www0.maths.ox.ac.uk/courses/course/6666');
		browser.teachingPage.assertNThirdYearCourses(2);
		browser.teachingPage.assertNthThirdYearCourse(1, 'Test course 7', 'http://www0.maths.ox.ac.uk/courses/course/7777');
		browser.teachingPage.assertNthThirdYearCourse(2, 'Test course 8', 'http://www0.maths.ox.ac.uk/courses/course/8888');
		browser.teachingPage.assertNFourthYearCourses(1);
		browser.teachingPage.assertNthFourthYearCourse(1, 'Test course 9', 'http://www0.maths.ox.ac.uk/courses/course/9999');
	},

};
