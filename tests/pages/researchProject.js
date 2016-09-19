module.exports = {
	elements: {
		identifier: '#project.identifier',
		bodyText: '#bodyText',
		backLink: 'a[href="/research"]',
		heading: '#heading',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@identifier').to.be.present;
			this.expect.element('@heading').to.be.visible;
			return this;
		},
		assertText: function (text) {
			this.expect.element('@bodyText').to.be.visible;
			this.expect.element('@bodyText').text.to.equal(text);
			return this;
		},
		assertTitle: function (title) {
			this.expect.element('@heading').to.be.visible;
			this.expect.element('@heading').text.to.equal(title);
		},
		backToResearchPage: function () {
			this.expect.element('@backLink').to.be.visible;
			this.click('@backLink');
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
