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
	},
	'after': function (browser) {
		browser.end();
	},


	'Courses page should display correctly in the initial modal': function (browser) {
		browser.adminUIApp.openList({ section: 'Content', list: 'Courses' });
		browser.adminUIApp.waitForListScreen();
		browser.adminUIListScreen.createFirstItem();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.assertFieldUIVisible({
			modelTestConfig: CourseModelTestConfig,
			fields: [{ name: 'title' }, { name: 'courseNumber' }, { name: 'year', options: { editForm: 'false' } }],
		});
	},

	'Admin UI should allow user to add a course': function (browser) {

		// Fill test inputs
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course' },
				courseNumber: { value: '1111' },
				year: { value: 'Prelims' },
			},
		});

		// Check test inputs in inital form
		browser.adminUIInitialForm.assertFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course' },
				courseNumber: { value: '1111' },
				year: { value: 'Prelims' },
			},
		});

		// Save inputs
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		// Check test inputs in edit form
		browser.adminUIItemScreen.assertFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course' },
				courseNumber: { value: '1111' },
				year: { value: 'Prelims' },
			},
		});
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
		browser.adminUIListScreen.navigateToFirstItem();
		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Updated Test Course' },
				courseNumber: { value: '2222' },
				year: { value: 'Part B' },
			},
		});
		browser.adminUIItemScreen.save();
		browser.adminUIItemScreen.assertFlashMessage('Your changes have been saved successfully');
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
		browser.adminUIListScreen.deleteItem('@firstItemDeleteIcon');
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

		browser.adminUIListScreen.createFirstItem();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course 1' },
				courseNumber: { value: '1111' },
				year: { value: 'Prelims' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course 2' },
				courseNumber: { value: '2222' },
				year: { value: 'Prelims' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course 3' },
				courseNumber: { value: '3333' },
				year: { value: 'Part A' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course 4' },
				courseNumber: { value: '4444' },
				year: { value: 'Part A' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course 5' },
				courseNumber: { value: '5555' },
				year: { value: 'Part A' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course 6' },
				courseNumber: { value: '6666' },
				year: { value: 'Part A' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course 7' },
				courseNumber: { value: '7777' },
				year: { value: 'Part B' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course 8' },
				courseNumber: { value: '8888' },
				year: { value: 'Part B' },
			},
		});
		browser.adminUIInitialForm.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.new();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialForm.fillFieldInputs({
			modelTestConfig: CourseModelTestConfig,
			fields: {
				title: { value: 'Test course 9' },
				courseNumber: { value: '9999' },
				year: { value: 'Part C' },
			},
		});
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
