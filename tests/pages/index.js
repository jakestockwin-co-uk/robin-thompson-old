var host = process.env.IP || 'localhost';
var port = process.env.PORT || '3000';

module.exports = {
	url: 'http://' + host + ':' + port,
	elements: {
		identifier: '#index.identifier',
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
	}],
};
