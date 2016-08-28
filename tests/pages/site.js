var host = process.env.IP || 'localhost';
var port = process.env.PORT || '3000';

module.exports = {
	url: 'http://' + host + ':' + port,
	elements: {
		navbar: '.navbar',
		navbarRight: '.navbar-right > li',

		// Navbar links
		homeLink: 'li#home',
		researchLink: 'li#research',
		teachingLink: 'li#teaching',
		publicationsLink: 'li#publications',

		sidebarTwitterHeader: '#sidebar > ul:nth-of-type(1) > li > h3',
		twitter: '.twitter',
		sidebarCVHeader: '#sidebar > ul:nth-of-type(2) > li > a > h3',
	},
	commands: [{
		assertUI: function () {
			this.assertNavbarUI();
			this.assertSidebarUI();
			return this;
		},
		assertNavbarUI: function () {
			this.expect.element('@navbar').to.be.visible;
			this.expect.element('@navbarRight').to.be.visible;
			this.expect.element('@homeLink').to.be.visible;
			this.expect.element('@researchLink').to.be.visible;
			this.expect.element('@teachingLink').to.be.visible;
			this.expect.element('@publicationsLink').to.be.visible;
			return this;
		},
		assertSidebarUI: function () {
			this.expect.element('@sidebarTwitterHeader').to.be.visible;
			this.expect.element('@twitter').to.be.visible;
			this.expect.element('@sidebarCVHeader').to.be.visible;
			return this;
		},
		waitForPageLoad: function () {
			this.waitForElementVisible('@navbar');
			return this;
		},
	}],
};

console.log('http://' + host + ':' + port);
