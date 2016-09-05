var host = process.env.IP || 'localhost';
var port = process.env.PORT || '3000';

module.exports = {
	url: 'http://' + host + ':' + port + '/teaching',
	elements: {
		identifier: '#teaching.identifier',

		firstYearTitle: '#firstYearCoursesTitle',
		firstYearList: '#firstYearCourses',
		secondYearTitle: '#secondYearCoursesTitle',
		secondYearList: '#secondYearCourses',
		thirdYearTitle: '#thirdYearCoursesTitle',
		thirdYearList: '#thirdYearCourses',
		fourthYearTitle: '#fourthYearCoursesTitle',
		fourthYearList: '#fourthYearCourses',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@identifier').to.be.present;
			return this;
		},

		assertNoFirstYearCourses: function () {
			this.expect.element('@firstYearTitle').to.not.be.present;
			this.expect.element('@firstYearList').to.not.be.present;
			this.expect.element(getNthFirstYearItemSelector(1)).to.not.be.present;
			return this;
		},
		assertNoNthFirstYearCourse: function (n) {
			this.expect.element(getNthFirstYearItemSelector(n)).to.not.be.present;
			return this;
		},
		assertNFirstYearCourses: function (n) {
			if (n === 0) {
				this.assertNoFirstYearCourses();
			} else {
				this.expect.element('@firstYearTitle').to.be.present;
				this.expect.element('@firstYearList').to.be.present;
				for (var i = 1; i <= n; i++) {
					this.expect.element(getNthFirstYearItemSelector(i)).to.be.present;
					this.expect.element(getNthFirstYearItemSelector(i)).to.have.attribute('href');
				}
				this.assertNoNthFirstYearCourse(n + 1);
			}
			return this;
		},
		assertNthFirstYearCourse: function (n, text, url) {
			this.expect.element('@firstYearTitle').to.be.present;
			this.expect.element('@firstYearList').to.be.present;
			this.assertNthFirstYearCourseText(n, text);
			this.assertNthFirstYearCourseLink(n, url);
			return this;
		},
		assertNthFirstYearCourseText: function (n, text) {
			this.expect.element(getNthFirstYearItemSelector(n)).text.to.equal(text);
			return this;
		},
		assertNthFirstYearCourseLink: function (n, url) {
			this.expect.element(getNthFirstYearItemSelector(n)).to.have.attribute('href', url);
			return this;
		},

		assertNoSecondYearCourses: function () {
			this.expect.element('@secondYearTitle').to.not.be.present;
			this.expect.element('@secondYearList').to.not.be.present;
			this.expect.element(getNthSecondYearItemSelector(1)).to.not.be.present;
			return this;
		},
		assertNoNthSecondYearCourse: function (n) {
			this.expect.element(getNthSecondYearItemSelector(n)).to.not.be.present;
			return this;
		},
		assertNSecondYearCourses: function (n) {
			if (n === 0) {
				this.assertNoSecondYearCourses();
			} else {
				this.expect.element('@secondYearTitle').to.be.present;
				this.expect.element('@secondYearList').to.be.present;
				for (var i = 1; i <= n; i++) {
					this.expect.element(getNthSecondYearItemSelector(i)).to.be.present;
					this.expect.element(getNthSecondYearItemSelector(i)).to.have.attribute('href');
				}
				this.assertNoNthSecondYearCourse(n + 1);
			}
			return this;
		},
		assertNthSecondYearCourse: function (n, text, url) {
			this.expect.element('@secondYearTitle').to.be.present;
			this.expect.element('@secondYearList').to.be.present;
			this.assertNthSecondYearCourseText(n, text);
			this.assertNthSecondYearCourseLink(n, url);
			return this;
		},
		assertNthSecondYearCourseText: function (n, text) {
			this.expect.element(getNthSecondYearItemSelector(n)).text.to.equal(text);
			return this;
		},
		assertNthSecondYearCourseLink: function (n, url) {
			this.expect.element(getNthSecondYearItemSelector(n)).to.have.attribute('href', url);
			return this;
		},


		assertNoThirdYearCourses: function () {
			this.expect.element('@thirdYearTitle').to.not.be.present;
			this.expect.element('@thirdYearList').to.not.be.present;
			this.expect.element(getNthThirdYearItemSelector(1)).to.not.be.present;
			return this;
		},
		assertNoNthThirdYearCourse: function (n) {
			this.expect.element(getNthThirdYearItemSelector(n)).to.not.be.present;
			return this;
		},
		assertNThirdYearCourses: function (n) {
			if (n === 0) {
				this.assertNoThirdYearCourses();
			} else {
				this.expect.element('@thirdYearTitle').to.be.present;
				this.expect.element('@thirdYearList').to.be.present;
				for (var i = 1; i <= n; i++) {
					this.expect.element(getNthThirdYearItemSelector(i)).to.be.present;
					this.expect.element(getNthThirdYearItemSelector(i)).to.have.attribute('href');
				}
				this.assertNoNthThirdYearCourse(n + 1);
			}
			return this;
		},
		assertNthThirdYearCourse: function (n, text, url) {
			this.expect.element('@thirdYearTitle').to.be.present;
			this.expect.element('@thirdYearList').to.be.present;
			this.assertNthThirdYearCourseText(n, text);
			this.assertNthThirdYearCourseLink(n, url);
			return this;
		},
		assertNthThirdYearCourseText: function (n, text) {
			this.expect.element(getNthThirdYearItemSelector(n)).text.to.equal(text);
			return this;
		},
		assertNthThirdYearCourseLink: function (n, url) {
			this.expect.element(getNthThirdYearItemSelector(n)).to.have.attribute('href', url);
			return this;
		},

		assertNoFourthYearCourses: function () {
			this.expect.element('@fourthYearTitle').to.not.be.present;
			this.expect.element('@fourthYearList').to.not.be.present;
			this.expect.element(getNthFourthYearItemSelector(1)).to.not.be.present;
			return this;
		},
		assertNoNthFourthYearCourse: function (n) {
			this.expect.element(getNthFourthYearItemSelector(n)).to.not.be.present;
			return this;
		},
		assertNFourthYearCourses: function (n) {
			if (n === 0) {
				this.assertNoFourthYearCourses();
			} else {
				this.expect.element('@fourthYearTitle').to.be.present;
				this.expect.element('@fourthYearList').to.be.present;
				for (var i = 1; i <= n; i++) {
					this.expect.element(getNthFourthYearItemSelector(i)).to.be.present;
					this.expect.element(getNthFourthYearItemSelector(i)).to.have.attribute('href');
				}
				this.assertNoNthFourthYearCourse(n + 1);
			}
			return this;
		},
		assertNthFourthYearCourse: function (n, text, url) {
			this.expect.element('@fourthYearTitle').to.be.present;
			this.expect.element('@fourthYearList').to.be.present;
			this.assertNthFourthYearCourseText(n, text);
			this.assertNthFourthYearCourseLink(n, url);
			return this;
		},
		assertNthFourthYearCourseText: function (n, text) {
			this.expect.element(getNthFourthYearItemSelector(n)).text.to.equal(text);
			return this;
		},
		assertNthFourthYearCourseLink: function (n, url) {
			this.expect.element(getNthFourthYearItemSelector(n)).to.have.attribute('href', url);
			return this;
		},

		waitForPageLoad: function () {
			this.waitForElementPresent('@identifier');
			return this;
		},
		verifyPageLoad: function () {
			this.expect.element('@identifier').to.be.present;
			return this;
		},
	}],
};

function getNthFirstYearItemSelector (n) {
	return '#firstYearCourses li:nth-of-type(' + n + ') a';
}
function getNthSecondYearItemSelector (n) {
	return '#secondYearCourses li:nth-of-type(' + n + ') a';
}
function getNthThirdYearItemSelector (n) {
	return '#thirdYearCourses li:nth-of-type(' + n + ') a';
}
function getNthFourthYearItemSelector (n) {
	return '#fourthYearCourses li:nth-of-type(' + n + ') a';
}
