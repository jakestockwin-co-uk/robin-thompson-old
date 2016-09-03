var host = process.env.IP || 'localhost';
var port = process.env.PORT || '3000';

module.exports = {
	url: 'http://' + host + ':' + port + '/publications',
	elements: {
		identifier: '#publication.identifier',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@identifier').to.be.present;
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
		assertNthPublication: function (n, value) {
			this.expect.element(getNthPublicationSelector(n)).to.be.visible;
			this.getText(getNthPublicationSelector(n), function (result) {
				this.assert.equal(result.state, 'success');
				this.assert.equal(result.value, value);
			});
			return this;
		},
		assertNthPublicationContains: function (n, value) {
			this.expect.element(getNthPublicationSelector(n)).to.be.visible;
			this.assert.containsText(getNthPublicationSelector(n), value);
			return this;
		},
		assertNthPublicationLink: function (n, value) {
			this.expect.element(getNthPublicationLinkSelector(n)).to.be.visible;
			this.assert.attributeEquals(getNthPublicationLinkSelector(n), 'href', value);
			return this;
		},
		assertNthPublicationNotPresent: function (n) {
			this.expect.element(getNthPublicationSelector(n)).to.not.be.present;
			return this;
		},
		assertNthPublicationLinkNotPresent: function (n) {
			this.expect.element(getNthPublicationLinkSelector(n)).to.not.be.present;
			return this;
		},
	}],
};

function getNthPublicationSelector (n) {
	return '#publications li:nth-of-type(' + n + ')';
};

function getNthPublicationLinkSelector (n) {
	return '#publications li:nth-of-type(' + n + ') a';
};
