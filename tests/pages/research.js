var host = process.env.IP || 'localhost';
var port = process.env.PORT || '3000';

module.exports = {
	url: 'http://' + host + ':' + port + '/research',
	elements: {
		identifier: '#research.identifier',
		researchList: '#research-list',
		heading: '#heading',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@identifier').to.be.present;
			this.expect.element('@researchList').to.be.visible;
			this.expect.element('@heading').text.to.equal('Research Interests');
			return this;
		},
		assertResearchListVisible: function () {
			this.expect.element('@researchList').to.be.visible;
			return this;
		},
		assertNthResearchProjectVisible: function (n) {
			this.expect.element(getNthResearchSelector(n)).to.be.visible;
			return this;
		},
		assertNthResearchProjectNotPresent: function (n) {
			this.expect.element(getNthResearchSelector(n)).to.not.be.present;
			return this;
		},
		assertNResearchProjectsVisible: function (n, exact) {
			if (n > 0) {
				for (var i = 1; i <= n; i++) {
					this.assertNthResearchProjectVisible(n);
				}
			}
			if (exact) {
				this.assertNthResearchProjectNotPresent(n + 1);
			}
			return this;
		},
		assertNthResearchProjectText: function (n, value) {
			this.expect.element(getNthResearchLinkSelector(n)).text.to.equal(value);
			return this;
		},
		clickNthResearchProject: function (n) {
			this.click(getNthResearchLinkSelector(n));
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

function getNthResearchSelector (n) {
	return '#research-list li:nth-of-type(' + n + ')';
}

function getNthResearchLinkSelector (n) {
	return '#research-list li:nth-of-type(' + n + ') a';
}
