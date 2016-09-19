var host = process.env.IP || 'localhost';
var port = process.env.PORT || '3000';

module.exports = {
	url: 'http://' + host + ':' + port,
	elements: {
		identifier: '#index.identifier',
		heading: '#heading',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@identifier').to.be.present;
			this.expect.element('@heading').text.to.equal('Robin Thompson');
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
