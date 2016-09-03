var host = process.env.IP || 'localhost';
var port = process.env.PORT || '3000';

module.exports = {
	url: 'http://' + host + ':' + port + '/publications',
	elements: {
		identifier: '#publication.identifier',
		firstPublication: '#publications li:nth-of-type(1)',
		firstPublicationLink: '#publications li:nth-of-type(1) a',
		secondPublication: '#publications li:nth-of-type(2)',
		secondPublicationLink: '#publications li:nth-of-type(2) a',
		thirdPublication: '#publications li:nth-of-type(3)',
		thirdPublicationLink: '#publications li:nth-of-type(3) a',
		fourthPublication: '#publications li:nth-of-type(4)',
		fourthPublicationLink: '#publications li:nth-of-type(4) a',
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
		assertFirstPublication: function (value) {
			this.expect.element('@firstPublication').to.be.visible;
			this.getText('@firstPublication', function (result) {
				this.assert.equal(result.state, 'success');
				this.assert.equal(result.value, value);
			});
			return this;
		},
		assertFirstPublicationContains: function (value) {
			this.expect.element('@firstPublication').to.be.visible;
			this.assert.containsText('@firstPublication', value);
			return this;
		},
		assertFirstPublicationLink: function (value) {
			this.expect.element('@firstPublicationLink').to.be.visible;
			this.assert.attributeEquals('@firstPublicationLink', 'href', value);
			return this;
		},
		assertFirstPublicationNotPresent: function () {
			this.expect.element('@firstPublication').to.not.be.present;
			return this;
		},
		assertFirstPublicationLinkNotPresent: function () {
			this.expect.element('@firstPublicationLink').to.not.be.present;
			return this;
		},
		assertSecondPublication: function (value) {
			this.expect.element('@secondPublication').to.be.visible;
			this.getText('@secondPublication', function (result) {
				this.assert.equal(result.state, 'success');
				this.assert.equal(result.value, value);
			});
			return this;
		},
		assertSecondPublicationContains: function (value) {
			this.expect.element('@secondPublication').to.be.visible;
			this.assert.containsText('@secondPublication', value);
			return this;
		},
		assertThirdPublication: function (value) {
			this.expect.element('@thirdPublication').to.be.visible;
			this.getText('@thirdPublication', function (result) {
				this.assert.equal(result.state, 'success');
				this.assert.equal(result.value, value);
			});
			return this;
		},
		assertThirdPublicationContains: function (value) {
			this.expect.element('@thirdPublication').to.be.visible;
			this.assert.containsText('@thirdPublication', value);
			return this;
		},
		assertFourthPublication: function (value) {
			this.expect.element('@fourthPublication').to.be.visible;
			this.getText('@fourthPublication', function (result) {
				this.assert.equal(result.state, 'success');
				this.assert.equal(result.value, value);
			});
			return this;
		},
		assertFourthPublicationContains: function (value) {
			this.expect.element('@fourthPublication').to.be.visible;
			this.assert.containsText('@fourthPublication', value);
			return this;
		},
	}],
};
